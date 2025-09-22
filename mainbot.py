#!/usr/bin/env python3
"""
Telegram Userbot with Voice Chat Support
"""

import asyncio
import logging
import sys
import os
from pyrogram import Client, filters, idle
from config import Config

# Voice chat imports 
try:
    from pytgcalls import PyTgCalls
    from pytgcalls.types import AudioPiped, Update
    from pytgcalls.exceptions import NoActiveGroupCall
    VOICE_AVAILABLE = True
    print("✅ Voice chat features available")
except ImportError:
    VOICE_AVAILABLE = False
    print("⚠️ Voice chat disabled - install py-tgcalls for voice features")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('userbot.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

class VoiceUserbot(Client):
    def __init__(self):
        super().__init__(
            name=Config.SESSION_NAME,
            api_id=Config.API_ID,
            api_hash=Config.API_HASH,
        )
        
        # Initialize voice chat
        if VOICE_AVAILABLE:
            self.calls = PyTgCalls(self)
            self.current_chat = None
            self.is_playing = False
        
        # Set up handlers
        self.setup_handlers()
    
    def setup_handlers(self):
        """Setup command handlers"""
        
        @self.on_message(filters.user(Config.OWNER_ID) & filters.command("help"))
        async def help_command(client, message):
            voice_commands = ""
            if VOICE_AVAILABLE:
                voice_commands = """
🎵 **Voice Chat Commands:**
• `/join` - Join voice chat
• `/play <file/url>` - Play audio file
• `/stop` - Stop playback  
• `/leave` - Leave voice chat
• `/volume <1-100>` - Set volume
• `/pause` - Pause playback
• `/resume` - Resume playback
                """
            
            help_text = f"""
🤖 **Userbot Commands**

📝 **Basic Commands:**
• `/help` - Show this help
• `/status` - Bot status  
• `/ping` - Test response
• `/info` - Account info
• `/echo <text>` - Echo message

🌐 **AI Commands:**
• `/translate <lang> <text>` - Translate text
{voice_commands}
🔒 Owner-only access active!
            """
            await message.edit(help_text)
        
        # Voice Chat Commands (only if available)
        if VOICE_AVAILABLE:
            @self.on_message(filters.user(Config.OWNER_ID) & filters.command("join"))
            async def join_vc(client, message):
                try:
                    chat_id = message.chat.id
                    await self.calls.join_group_call(chat_id, AudioPiped(""))
                    self.current_chat = chat_id
                    await message.edit("✅ **Joined voice chat!**")
                except Exception as e:
                    await message.edit(f"❌ **Failed to join:** `{str(e)}`")
            
            @self.on_message(filters.user(Config.OWNER_ID) & filters.command("leave"))
            async def leave_vc(client, message):
                try:
                    if self.current_chat:
                        await self.calls.leave_group_call(self.current_chat)
                        self.current_chat = None
                        self.is_playing = False
                        await message.edit("👋 **Left voice chat!**")
                    else:
                        await message.edit("❌ **Not in any voice chat**")
                except Exception as e:
                    await message.edit(f"❌ **Error leaving:** `{str(e)}`")
            
            @self.on_message(filters.user(Config.OWNER_ID) & filters.command("play"))
            async def play_audio(client, message):
                try:
                    # Check if in voice chat
                    if not self.current_chat:
                        await message.edit("❌ **Join a voice chat first with /join**")
                        return
                    
                    # Get audio file/URL
                    parts = message.text.split(maxsplit=1)
                    if len(parts) < 2:
                        # Check for reply to audio file
                        if message.reply_to_message and message.reply_to_message.audio:
                            audio_file = await message.reply_to_message.download()
                        else:
                            await message.edit("❌ **Usage:** `/play <file/url>` or reply to audio")
                            return
                    else:
                        audio_source = parts[1]
                        
                        # Handle URL
                        if audio_source.startswith(('http://', 'https://')):
                            await message.edit("🔄 **Processing URL...**")
                            try:
                                import yt_dlp
                                ydl_opts = {
                                    'format': 'bestaudio/best',
                                    'noplaylist': True,
                                    'extract_flat': False,
                                }
                                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                                    info = ydl.extract_info(audio_source, download=False)
                                    audio_file = info['url']
                            except Exception as e:
                                await message.edit(f"❌ **URL processing failed:** `{str(e)}`")
                                return
                        else:
                            # Local file
                            if os.path.exists(audio_source):
                                audio_file = audio_source
                            else:
                                await message.edit("❌ **File not found**")
                                return
                    
                    # Play audio
                    await message.edit("🎵 **Starting playback...**")
                    await self.calls.change_stream(
                        self.current_chat,
                        AudioPiped(audio_file)
                    )
                    self.is_playing = True
                    
                    file_name = os.path.basename(audio_file) if isinstance(audio_file, str) else "Audio Stream"
                    await message.edit(f"🎵 **Now Playing:** `{file_name}`")
                    
                except Exception as e:
                    await message.edit(f"❌ **Playback failed:** `{str(e)}`")
            
            @self.on_message(filters.user(Config.OWNER_ID) & filters.command("stop"))
            async def stop_audio(client, message):
                try:
                    if self.current_chat and self.is_playing:
                        await self.calls.change_stream(self.current_chat, AudioPiped(""))
                        self.is_playing = False
                        await message.edit("⏹️ **Stopped playback**")
                    else:
                        await message.edit("❌ **Nothing is playing**")
                except Exception as e:
                    await message.edit(f"❌ **Stop failed:** `{str(e)}`")
            
            @self.on_message(filters.user(Config.OWNER_ID) & filters.command("pause"))
            async def pause_audio(client, message):
                try:
                    if self.current_chat:
                        await self.calls.pause_stream(self.current_chat)
                        await message.edit("⏸️ **Paused**")
                    else:
                        await message.edit("❌ **Not in voice chat**")
                except Exception as e:
                    await message.edit(f"❌ **Pause failed:** `{str(e)}`")
            
            @self.on_message(filters.user(Config.OWNER_ID) & filters.command("resume"))
            async def resume_audio(client, message):
                try:
                    if self.current_chat:
                        await self.calls.resume_stream(self.current_chat)
                        await message.edit("▶️ **Resumed**")
                    else:
                        await message.edit("❌ **Not in voice chat**")
                except Exception as e:
                    await message.edit(f"❌ **Resume failed:** `{str(e)}`")
        
        # Keep existing basic commands
        @self.on_message(filters.user(Config.OWNER_ID) & filters.command("ping"))
        async def ping_command(client, message):
            import time
            start = time.time()
            await message.edit("🏓 Pinging...")
            end = time.time()
            ping_time = (end - start) * 1000
            await message.edit(f"🏓 **Pong!** `{ping_time:.2f}ms`")
        
        @self.on_message(filters.user(Config.OWNER_ID) & filters.command("status"))
        async def status_command(client, message):
            try:
                import psutil
                import time
                
                # Voice status
                voice_status = "❌ Disabled"
                if VOICE_AVAILABLE:
                    if self.current_chat:
                        voice_status = f"🎵 Active in chat {self.current_chat}"
                        if self.is_playing:
                            voice_status += " (Playing)"
                    else:
                        voice_status = "✅ Available (Not connected)"
                
                cpu_percent = psutil.cpu_percent()
                memory = psutil.virtual_memory()
                uptime = time.time() - self.start_time
                
                status_text = f"""
📊 **Bot Status**

👤 **Account:** {self.me.first_name}
🆔 **User ID:** {self.me.id}
⚡ **Uptime:** {int(uptime//3600)}h {int((uptime%3600)//60)}m
💻 **CPU:** {cpu_percent}%
🧠 **RAM:** {memory.percent}%
🎵 **Voice Chat:** {voice_status}
🐍 **Python:** {sys.version.split()[0]}

✅ **Status:** Online & Working!
                """
                await message.edit(status_text)
            except Exception as e:
                await message.edit(f"📊 **Bot Status:** Online!\n❌ **Error:** {e}")

async def main():
    """Start the userbot"""
    print("🎵 Voice-Enabled Telegram Userbot Starting...")
    
    # Validate config
    if not Config.validate():
        print("❌ Invalid configuration! Check your .env file")
        return
    
    # Create and start bot
    bot = VoiceUserbot()
    
    try:
        await bot.start()
        
        # Start voice calls if available
        if VOICE_AVAILABLE:
            await bot.calls.start()
        
        # Store start time and user info
        import time
        bot.start_time = time.time()
        bot.me = await bot.get_me()
        
        print("✅ Userbot started successfully!")
        print(f"👤 Logged in as: {bot.me.first_name}")
        print(f"🔒 Owner ID: {Config.OWNER_ID}")
        if VOICE_AVAILABLE:
            print("🎵 Voice chat features: ENABLED")
        else:
            print("⚠️  Voice chat features: DISABLED")
        print("📝 Send /help to see available commands")
        print("🛑 Press Ctrl+C to stop")
        
        # Keep running
        await idle()
        
    except KeyboardInterrupt:
        print("\n👋 Shutting down...")
    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        if VOICE_AVAILABLE and hasattr(bot, 'calls'):
            await bot.calls.stop()
        await bot.stop()

if __name__ == "__main__":
    asyncio.run(main())

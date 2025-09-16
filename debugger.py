# Add these imports at the top of your bot.py (after the existing imports)
from pytgcalls import PyTgCalls
from pytgcalls.types import MediaStream
from pytgcalls.exceptions import NoActiveGroupCall

# Update your MusicBot class __init__ method:
class MusicBot:
    def __init__(self):
        self.app = Client(
            Config.SESSION_NAME,
            api_id=Config.API_ID,
            api_hash=Config.API_HASH,
            bot_token=Config.BOT_TOKEN
        )
        self.pytgcalls = PyTgCalls(self.app)  # Add this line
        self.db = Database()
        self.is_running = False

    async def start(self):
        """Start the bot"""
        try:
            await self.app.start()
            await self.pytgcalls.start()  # Add this line
            await self.db.init_db()
            self.is_running = True
            
            # ... rest of your start method stays the same

    # Replace your play_command function with this working version:
    @self.app.on_message(filters.command("play") & (filters.group | filters.channel))
    async def play_command(client, message):
        user_id = message.from_user.id
        chat_id = message.chat.id
        
        try:
            chat_member = await client.get_chat_member(chat_id, user_id)
            if user_id not in Config.SUDO_USERS and chat_member.status not in ["administrator", "creator"]:
                await message.reply("❌ Admins only!")
                return
        except:
            await message.reply("❌ Permission error!")
            return
        
        # Get user's latest file
        try:
            async with aiosqlite.connect(self.db.db_name) as db:
                async with db.execute("""
                    SELECT file_path, file_type, file_name FROM media_files 
                    WHERE user_id = ? ORDER BY created_at DESC LIMIT 1
                """, (user_id,)) as cursor:
                    file_data = await cursor.fetchone()
            
            if not file_data:
                await message.reply("❌ No files found! Send files to bot DM first.")
                return
            
            file_path, file_type, file_name = file_data
            
            if not os.path.exists(file_path):
                await message.reply("❌ File not found!")
                return
            
            # Join voice chat and play
            try:
                stream = MediaStream(file_path)
                await self.pytgcalls.join_group_call(chat_id, stream)
                
                await message.reply(f"""
🎵 **Now Playing in Voice Chat!**

📁 **File:** {file_name}
🎵 **Type:** {file_type}
🔊 **Volume:** {Config.AUDIO_VOLUME}% (Enhanced)
📹 **Quality:** {Config.VIDEO_QUALITY}p (HD)

✅ **Bot joined voice chat and is playing!**

Use `/stop` to stop playback.
""")
                
            except NoActiveGroupCall:
                await message.reply("""
❌ **No active voice chat!**

**To use this bot:**
1. Start a voice chat in this group
2. Make sure bot has admin permissions
3. Use `/play` command again

**Start a voice chat first!**
""")
            except Exception as e:
                await message.reply(f"❌ Error joining voice chat: {str(e)}")
                
        except Exception as e:
            await message.reply(f"❌ Error: {str(e)}")

    # Add stop command
    @self.app.on_message(filters.command("stop") & (filters.group | filters.channel))
    async def stop_command(client, message):
        user_id = message.from_user.id
        chat_id = message.chat.id
        
        try:
            chat_member = await client.get_chat_member(chat_id, user_id)
            if user_id not in Config.SUDO_USERS and chat_member.status not in ["administrator", "creator"]:
                await message.reply("❌ Admins only!")
                return
        except:
            return
        
        try:
            await self.pytgcalls.leave_group_call(chat_id)
            await message.reply("⏹️ **Stopped playback and left voice chat!**")
        except Exception as e:
            await message.reply(f"❌ Error: {str(e)}")

    async def stop(self):
        if self.is_running:
            self.is_running = False
            await self.pytgcalls.stop()  # Add this line
            await self.app.stop()

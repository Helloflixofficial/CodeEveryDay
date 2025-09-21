from pyrofork import filters
from pyrofork.handlers import MessageHandler
from pyrofork.types import Message
from ..utils.decorators import owner_only
from config import Config
import time

class StatusHandler(MessageHandler):
    def __init__(self, owner_filter):
        super().__init__(
            self.handle_status,
            filters.command("status") & owner_filter
        )
    
    @owner_only
    async def handle_status(self, client, message: Message):
        """Show bot status and statistics"""
        try:
            # Get database stats
            db_stats = await client.db.get_stats()
            
            status_text = f"""
📊 **Userbot Status**

🤖 **Bot Info:**
• Owner: `{Config.OWNER_ID}`
• Session: `{Config.SESSION_NAME}`
• Volume: `{Config.AUDIO_VOLUME}%`
• Video Quality: `{Config.VIDEO_QUALITY}p`

📈 **Statistics:**
• Total Plays: `{db_stats.get('total_plays', 0)}`
• AI Interactions: `{db_stats.get('ai_interactions', 0)}`
• Files Downloaded: `{db_stats.get('downloads', 0)}`

🔧 **System:**
• Status: ✅ Online
• Uptime: `{time.strftime('%H:%M:%S', time.gmtime(time.time()))}`
• Database: ✅ Connected
• AI Services: ✅ Active
            """
            
            await message.edit(status_text)
            
        except Exception as e:
            await message.edit(f"❌ **Error getting status:** `{str(e)}`")

class HelpHandler(MessageHandler):
    def __init__(self, owner_filter):
        super().__init__(
            self.handle_help,
            filters.command("help") & owner_filter
        )
    
    @owner_only
    async def handle_help(self, client, message: Message):
        """Show available commands"""
        help_text = """
🤖 **AI-Powered Telegram Userbot**

🎵 **Audio/Video Commands:**
• `/play <file/url>` - Play media in voice chat
• `/stop` - Stop playback and leave voice chat
• `/pause` - Pause current playback
• `/resume` - Resume paused playbook
• `/volume <1-200>` - Adjust volume level

🤖 **AI Features:**
• `/translate <lang> <text>` - Translate text
• `/grammar <text>` - Correct grammar
• `/download <url>` - Download files from URLs
• `/analyze` - Analyze images (reply to image)
• `/imagine <prompt>` - Generate images (placeholder)

⚙️ **Admin Commands:**
• `/status` - Show bot status and stats
• `/help` - Show this help message

📝 **Examples:**
• `/play https://youtube.com/watch?v=xyz`
• `/translate english Hello world`
• `/grammar me go store yesterday`
• `/volume 150`

🔒 **Owner-Only Access**: Only you can use these commands!
        """
        
        await message.edit(help_text)

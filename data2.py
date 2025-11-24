

from pyrogram.types import InlineKeyboardButton

class Data:
    HELP = """
<b> ❏ User Commands for the Bot
 ├ /start - Start the bot
 ├ /about - Information about this bot
 ├ /help - Help menu for bot commands
 ├ /ping - Check if the bot is active
 └ /uptime - View the bot's status 
 
 ❏ Admin Commands for the Bot
 ├ /logs - View bot logs
 ├ /setvar - Set a variable using bot commands
 ├ /delvar - Delete a variable using bot commands
 ├ /getvar - View a specific variable using bot commands
 ├ /users - View bot user statistics
 ├ /batch - Generate links for multiple files
 ├ /speedtest - Test the bot server's speed
 └ /broadcast - Send a broadcast message to bot users

👨‍💻 Developed by </b><a href='https://t.me/Fucking_looser'>@Fucking_looser</a>
"""

    close = [
        [InlineKeyboardButton("Close", callback_data="close")]
    ]

    mbuttons = [
        [
            InlineKeyboardButton("Help & Commands", callback_data="help"),
            InlineKeyboardButton("Close", callback_data="close")
        ],
    ]

    buttons = [
        [
            InlineKeyboardButton("About Me", callback_data="about"),
            InlineKeyboardButton("Close", callback_data="close")
        ],
    ]

    ABOUT = """
<b>About this Bot:

@{} is a Telegram bot designed to store posts or files that can be accessed via unique links.

 • Creator: @{}
 • Framework: <a href='https://docs.pyrogram.org'>Pyrogram</a>
👨‍💻 Developed by </b><a href='https://t.me/Fucking_looser'>@Fucking_looser</a>
"""

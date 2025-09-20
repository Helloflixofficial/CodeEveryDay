#!/usr/bin/env python3
import asyncio
from pyrogram import Client
import os
from dotenv import load_dotenv

load_dotenv()

API_ID = int(os.getenv("API_ID", "0"))
API_HASH = os.getenv("API_HASH", "")
SESSION_NAME = os.getenv("SESSION_NAME", "userbot")

async def generate_session():
    print("🔐 Simple Session Generator")
    print("=" * 40)
    
    if not API_ID or not API_HASH:
        print("❌ Set API_ID and API_HASH in .env file")
        return
    
    try:
        app = Client(SESSION_NAME, API_ID, API_HASH)
        await app.start()
        
        me = await app.get_me()
        print(f"✅ Success! Logged in as: {me.first_name}")
        print(f"📱 Phone: {me.phone_number}")
        print(f"🆔 User ID: {me.id}")
        print(f"💾 Session: {SESSION_NAME}.session")
        
        await app.stop()
        print("🎉 Session generated successfully!")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    asyncio.run(generate_session())

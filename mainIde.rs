#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::collections::HashMap;
use std::sync::Mutex;
use tauri::Manager;

// Application state
pub struct AppState {
    pub tabs: Mutex<HashMap<String, TabData>>,
    pub projects: Mutex<HashMap<String, ProjectData>>,
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct TabData {
    pub id: String,
    pub title: String,
    pub language: String,
    pub content: String,
    pub file_path: Option<String>,
    pub is_dirty: bool,
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct ProjectData {
    pub id: String,
    pub name: String,
    pub path: String,
    pub files: Vec<String>,
}

// CodeExecutionResult is now defined in code_runner.rs

// Import command modules
mod ai_engine;
mod code_runner;
mod commands;
mod file_manager;
mod lsp_client;

use commands::*;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .manage(AppState {
            tabs: Mutex::new(HashMap::new()),
            projects: Mutex::new(HashMap::new()),
        })
        .invoke_handler(tauri::generate_handler![
            // Tab management
            create_tab,
            update_tab,
            delete_tab,
            get_tabs,
            // Code execution
            execute_code_command,
            // File operations
            save_file,
            open_file,
            create_file,
            delete_file,
            read_directory,
            // AI features
            get_ai_suggestion,
            get_ai_completion,
            // Project management
            create_project,
            open_project,
            get_projects,
            // Terminal operations
            execute_terminal_command,
        ])
        .setup(|app| {
            #[cfg(debug_assertions)]
            {
                let window = app.get_webview_window("main").unwrap();
                window.open_devtools();
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

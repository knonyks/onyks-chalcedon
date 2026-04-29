// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use std::process::Command;
use std::path::Path;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn is_svn_repository(svn_folder_path: &str) -> bool {
    let path = Path::new(svn_folder_path).join(".svn");
    path.is_dir() 
}

#[tauri::command]
fn svn_status(svn_folder_path: &str) -> Result<Vec<String>, String> {
    let output = Command::new("svn")
        .current_dir(svn_folder_path)
        .arg("status")
        .output()
        .map_err(|e| format!("Błąd uruchomienia: {}", e))?;
    if output.status.success() {
        let stdout = String::from_utf8_lossy(&output.stdout);
        let mut pliki = Vec::new();

        for linia in stdout.lines() {
            let czesci: Vec<&str> = linia.split_whitespace().collect();
            
            if czesci.len() >= 2 {
                if let Some(sciezka) = czesci.last() {
                    pliki.push(sciezka.to_string());
                }
            }
        }
        
        Ok(pliki)
    } else {
        Err(String::from_utf8_lossy(&output.stderr).to_string())
    }
}

#[tauri::command]
fn svn_checkout(svn_folder_path: &str, login: &str, password: &str, url: &str) -> Result<Vec<String>, String> {
    let output = Command::new("svn")
        .current_dir(svn_folder_path) 
        .args([
            "checkout", url, ".", 
            "--username", login, 
            "--password", password, 
            "--trust-server-cert", 
            "--non-interactive", 
            "--no-auth-cache"
        ])
        .output()
        .map_err(|e| format!("Błąd wykonania komendy: {}", e))?;
    if output.status.success() {
        let stdout = String::from_utf8_lossy(&output.stdout);
        let lista_linijek: Vec<String> = stdout.lines().map(|linia| linia.to_string()).collect();
        Ok(lista_linijek)
    } else {
        Err(String::from_utf8_lossy(&output.stderr).to_string())
    }
}

#[tauri::command]
fn svn_add_all(svn_folder_path: &str) -> Result<Vec<String>, String> {
    let output = Command::new("svn")
        .current_dir(svn_folder_path) 
        .args([
            "add", "--force", "."
        ])
        .output()
        .map_err(|e| format!("Błąd wykonania komendy: {}", e))?;
    if output.status.success() {
        let stdout = String::from_utf8_lossy(&output.stdout);
        let lista_linijek: Vec<String> = stdout.lines().map(|linia| linia.to_string()).collect();
        Ok(lista_linijek)
    } else {
        Err(String::from_utf8_lossy(&output.stderr).to_string())
    }
}

#[tauri::command]
fn svn_commit(svn_folder_path: &str, login: &str, password: &str, commit_name: &str) -> Result<String, String> {
    let output = Command::new("svn")
        .current_dir(svn_folder_path) 
        .args([
            "commit", "-m", commit_name,
            "--username", login, 
            "--password", password, 
            "--trust-server-cert", 
            "--non-interactive", 
            "--no-auth-cache"
        ])
        .output()
        .map_err(|e| format!("Błąd wykonania komendy: {}", e))?;
    if output.status.success() {
        Ok(String::from_utf8_lossy(&output.stdout).to_string())
    } else {
        Err(String::from_utf8_lossy(&output.stderr).to_string())
    }
}

#[tauri::command]
fn svn_update(svn_folder_path: &str, login: &str, password: &str) -> Result<String, String> {
    let output = Command::new("svn")
        .current_dir(svn_folder_path) 
        .args([
            "update",
            "--username", login, 
            "--password", password, 
            "--trust-server-cert", 
            "--non-interactive", 
            "--no-auth-cache"
        ])
        .output()
        .map_err(|e| format!("Błąd wykonania komendy: {}", e))?;
    if output.status.success() {
        Ok(String::from_utf8_lossy(&output.stdout).to_string())
    } else {
        Err(String::from_utf8_lossy(&output.stderr).to_string())
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, is_svn_repository, svn_status, svn_checkout, svn_add_all, svn_commit, svn_update])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

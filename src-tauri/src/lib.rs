// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[cfg(target_os = "windows")]
use std::os::windows::process::CommandExt;

use std::path::Path;
use std::process::Command;
use tauri::Manager;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command(async)]
fn is_svn_repository(svn_folder_path: &str) -> bool {
    let path = Path::new(svn_folder_path).join(".svn");
    path.is_dir()
}

#[tauri::command(async)]
fn svn_status(svn_folder_path: &str) -> Result<Vec<String>, String> {
    let mut command = Command::new("svn");
    #[cfg(target_os = "windows")]
    command.creation_flags(0x08000000);
    let output = command
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

#[tauri::command(async)]
fn svn_checkout(
    svn_folder_path: &str,
    login: &str,
    password: &str,
    url: &str,
) -> Result<Vec<String>, String> {
    let mut command = Command::new("svn");
    #[cfg(target_os = "windows")]
    command.creation_flags(0x08000000);
    let output = command
        .current_dir(svn_folder_path)
        .args([
            "checkout",
            url,
            svn_folder_path,
            "--username",
            login,
            "--password",
            password,
            "--trust-server-cert",
            "--non-interactive",
            "--no-auth-cache",
        ])
        .output()
        .map_err(|e| format!("Błąd wykonania komendy: {}", e))?;
    if output.status.success() {
        let stdout = String::from_utf8_lossy(&output.stdout);
        let mut pliki = Vec::new();

        for linia in stdout.lines() {
            let czesci: Vec<&str> = linia.split_whitespace().collect();
            if czesci.len() >= 2 {
                let sciezka = czesci[1..].join(" ");
                pliki.push(sciezka);
            }
        }

        Ok(pliki)
    } else {
        Err(String::from_utf8_lossy(&output.stderr).to_string())
    }
}

#[tauri::command(async)]
fn svn_add_all(svn_folder_path: &str) -> Result<Vec<String>, String> {
    let mut command = Command::new("svn");
    #[cfg(target_os = "windows")]
    command.creation_flags(0x08000000);
    let output = command
        .current_dir(svn_folder_path)
        .args(["add", "--force", "."])
        .output()
        .map_err(|e| format!("Błąd wykonania komendy: {}", e))?;
    if output.status.success() {
        let stdout = String::from_utf8_lossy(&output.stdout);
        let mut pliki = Vec::new();

        for linia in stdout.lines() {
            let czesci: Vec<&str> = linia.split_whitespace().collect();
            if czesci.len() >= 2 {
                let sciezka = czesci[1..].join(" ");

                pliki.push(sciezka);
            }
        }
        Ok(pliki)
    } else {
        Err(String::from_utf8_lossy(&output.stderr).to_string())
    }
}

#[tauri::command(async)]
fn svn_commit(
    svn_folder_path: &str,
    login: &str,
    password: &str,
    commit_name: &str,
) -> Result<String, String> {
    let mut command = Command::new("svn");
    #[cfg(target_os = "windows")]
    command.creation_flags(0x08000000);
    let output = command
        .current_dir(svn_folder_path)
        .args([
            "commit",
            "-m",
            commit_name,
            "--username",
            login,
            "--password",
            password,
            "--trust-server-cert",
            "--non-interactive",
            "--no-auth-cache",
        ])
        .output()
        .map_err(|e| format!("Błąd wykonania komendy: {}", e))?;
    if output.status.success() {
        Ok(String::from_utf8_lossy(&output.stdout).to_string())
    } else {
        Err(String::from_utf8_lossy(&output.stderr).to_string())
    }
}

#[tauri::command(async)]
fn svn_update(svn_folder_path: &str, login: &str, password: &str) -> Result<String, String> {
    let mut command = Command::new("svn");
    #[cfg(target_os = "windows")]
    command.creation_flags(0x08000000);
    let output = command
        .current_dir(svn_folder_path)
        .args([
            "update",
            "--username",
            login,
            "--password",
            password,
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

#[tauri::command(async)]
fn svn_revert(svn_folder_path: &str) -> Result<String, String> {
    let mut command = Command::new("svn");
    #[cfg(target_os = "windows")]
    command.creation_flags(0x08000000);

    let output = command
        .current_dir(svn_folder_path)
        .args([
            "revert", 
            "-R", 
            "."
        ])
        .output()
        .map_err(|e| format!("Błąd wykonania komendy: {}", e))?;
    if output.status.success() {
        Ok(String::from_utf8_lossy(&output.stdout).to_string())
    } else {
        Err(String::from_utf8_lossy(&output.stderr).to_string())
    }
}

#[tauri::command(async)]
fn svn_cleanup(svn_folder_path: &str) -> Result<String, String> {
    let mut command = Command::new("svn");
    #[cfg(target_os = "windows")]
    command.creation_flags(0x08000000);

    let output = command
        .current_dir(svn_folder_path)
        .args([
            "cleanup",
            "--remove-unversioned",
            ])
        .output()
        .map_err(|e| format!("Błąd wykonania komendy: {}", e))?;
    if output.status.success() {
        Ok(String::from_utf8_lossy(&output.stdout).to_string())
    } else {
        Err(String::from_utf8_lossy(&output.stderr).to_string())
    }
}


#[tauri::command(async)]
fn svn_delete(svn_folder_path: &str) -> Result<String, String> {
    let mut status_command = Command::new("svn");
    #[cfg(target_os = "windows")]
    status_command.creation_flags(0x08000000);

    let status_output = status_command
        .current_dir(svn_folder_path)
        .arg("status")
        .output()
        .map_err(|e| format!("Błąd uruchomienia: {}", e))?;

    if !status_output.status.success() {
        return Err(String::from_utf8_lossy(&status_output.stderr).to_string());
    }

    let mut deleted_files = Vec::new();
    for line in String::from_utf8_lossy(&status_output.stdout).lines() {
        if let Some(path) = line.strip_prefix('!').map(str::trim_start) {
            let mut delete_command = Command::new("svn");
            #[cfg(target_os = "windows")]
            delete_command.creation_flags(0x08000000);

            let output = delete_command
                .current_dir(svn_folder_path)
                .args(["rm", path])
                .output()
                .map_err(|e| format!("Błąd wykonania komendy: {}", e))?;

            if !output.status.success() {
                return Err(String::from_utf8_lossy(&output.stderr).to_string());
            }

            deleted_files.push(path.to_string());
        }
    }

    Ok(deleted_files.join("\n"))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_http::init())
        .setup(|app| {
            let salt_path = app
                .path()
                .app_local_data_dir()
                .expect("could not resolve app local data path")
                .join("salt.txt");

            app.handle()
                .plugin(tauri_plugin_stronghold::Builder::with_argon2(&salt_path).build())?;
            Ok(())
        })
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            is_svn_repository,
            svn_status,
            svn_checkout,
            svn_add_all,
            svn_commit,
            svn_update,
            svn_delete,
            svn_revert,
            svn_cleanup
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

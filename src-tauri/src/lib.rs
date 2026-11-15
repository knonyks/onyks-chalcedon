// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use tauri::Manager;

pub mod dblib;
pub mod svn;

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
            dblib::dblib_generate_dsn,
            dblib::dblib_save,
            dblib::dblib_connectionstring,
            dblib::dblib_init,
            dblib::dblib_table,
            dblib::dblib_generate_tables,
            dblib::dblib_fieldmap,
            dblib::dblib_generate_fields,
            svn::is_svn_repository,
            svn::svn_status,
            svn::svn_checkout,
            svn::svn_add_all,
            svn::svn_commit,
            svn::svn_update,
            svn::svn_revert,
            svn::svn_cleanup,
            svn::svn_delete
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

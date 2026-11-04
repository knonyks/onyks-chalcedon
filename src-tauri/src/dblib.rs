use std::io;
use std::path::Path;

#[tauri::command(async)]
fn dblib_generate_dns(path: &str, file_name: &str) -> io::Result<()> {
	let file_path = Path::new(path).join(file_name);
	std::fs::write(
		file_path,
		format!("[ODBC]\nDRIVER=DuckDB Driver\nDatabase={path}\\{file_name}\n"),
	)
}
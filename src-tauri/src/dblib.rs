use std::path::Path;

#[tauri::command]
pub fn dblib_generate_dsn(path: &str, file_name: &str) -> Result<(), String> {
	let file_path = Path::new(path).join(format!("{file_name}.dsn"));
	std::fs::write(
		file_path,
		format!("[ODBC]\nDRIVER=DuckDB Driver\nDatabase={path}\\{file_name}.duckdb\n"),
	)
	.map_err(|error| error.to_string())
}
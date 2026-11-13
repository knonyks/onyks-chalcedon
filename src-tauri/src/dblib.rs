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

#[tauri::command(async)]
pub fn dblib_connectionstring(user: &str, source: &str) -> String {
    format!(
        "ConnectionString=Provider=MSDASQL.1;Persist Security Info=False;User ID={user};Data Source={source}"
    )
}

#[tauri::command(async)]
pub fn dblib_table(id: u32, name: &str, enabled: bool) -> String {
    
    let enabled_str = if enabled { "True" } else { "False" };
    format!(
        "[Table{id}]\n\
        SchemaName=\n\
        TableName={name}\n\
        Enabled={enabled_str}\n\
        UserWhere=0\n\
        UserWhereText="
    )
}

#[tauri::command(async)]
pub fn dblib_fieldmap(index: u32, table_name: &str, field_name: &str, 
    field_type: u32, parameter_name: &str, visible_on_add: bool, 
    add_mode: u32, remove_mode: u32, update_mode: u32) -> String {
    
    let visible_str = if visible_on_add { "True" } else { "False" };
    format!(
        "[FieldMap{index}]\n\
        Options=FieldName={table_name}.{field_name}|\
        TableNameOnly={table_name}|\
        FieldNameOnly={field_name}|\
        FieldType={field_type}|\
        ParameterName={parameter_name}|\
        VisibleOnAdd={visible_str}|\
        AddMode={add_mode}|\
        RemoveMode={remove_mode}|\
        UpdateMode={update_mode}",
    )
}
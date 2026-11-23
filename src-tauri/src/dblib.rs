use serde::Deserialize;
use std::path::Path;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Field {
    pub key: String,
    pub label: String,
    pub field_type: u32,
}

#[tauri::command]
pub fn dblib_generate_dsn(
    path: &str,
    file_name: &str,
    server: &str,
    port: u16,
    database: &str,
    username: &str,
    password: &str,
    sslmode: &str,
) -> Result<(), String> {
    let sslmode = sslmode.trim().to_ascii_lowercase();
    if !matches!(
        sslmode.as_str(),
        "disable" | "allow" | "prefer" | "require" | "verify-ca" | "verify-full"
    ) {
        return Err(
            "sslmode: disable, allow, prefer, require, verify-ca or verify-full".to_string(),
        );
    }

    let pqopt = if sslmode == "disable" {
        String::new()
    } else {
        "pqopt={sslnegotiation=direct}\n".to_string()
    };

    let file_path = Path::new(path).join(format!("{file_name}.dsn"));
    std::fs::write(
		file_path,
		format!(
            "[ODBC]\nDRIVER=PostgreSQL Unicode(x64)\nSERVER={server}\nPORT={port}\nDATABASE={database}\nUID={username}\nPWD={password}\nSSLMODE={sslmode}\n{pqopt}",
		),
	)
	.map_err(|error| error.to_string())
}

#[tauri::command(async)]
pub fn dblib_save(path: &str, file_name: &str, content: &str) -> Result<(), String> {
    let file_path = Path::new(path).join(format!("{file_name}.DbLib"));
    std::fs::OpenOptions::new()
        .write(true)
        .create(true)
        .truncate(true)
        .open(file_path)
        .and_then(|mut file| {
            std::io::Write::write_all(&mut file, format!("{content}\n").as_bytes())
        })
        .map_err(|error| error.to_string())
}

#[tauri::command(async)]
pub fn dblib_connectionstring(dsn_path: &str) -> String {
    format!("FILE NAME={dsn_path}")
}

#[tauri::command(async)]
pub fn dblib_init(schema_name: &str, connection_string: &str, last_focused_table: &str) -> String {
    format!(
        "[OutputDatabaseLinkFile]\n\
        Version=1.1\n\
        [DatabaseLinks]\n\
        ConnectionString={connection_string}\n\
        AddMode=3\n\
        RemoveMode=1\n\
        UpdateMode=2\n\
        ViewMode=0\n\
        LeftQuote=\"\n\
        RightQuote=\"\n\
        QuoteTableNames=1\n\
        UseTableSchemaName=0\n\
        DefaultColumnType=VARCHAR(255)\n\
        LibraryDatabaseType=\n\
        LibraryDatabasePath=\n\
        DatabasePathRelative=0\n\
        TopPanelCollapsed=0\n\
        LibrarySearchPath=\n\
        OrcadMultiValueDelimiter=,\n\
        SearchSubDirectories=0\n\
        SchemaName={schema_name}\n\
        LastFocusedTable={last_focused_table}\n"
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
pub fn dblib_generate_tables(table_names: Vec<String>) -> String {
    let mut sekcje = Vec::new();
    let mut nr: u32 = 1;

    for nazwa in table_names {
        let sekcja = dblib_table(nr, &nazwa, true);
        sekcje.push(sekcja);
        nr += 1;
    }

    sekcje.join("\n")
}

#[tauri::command(async)]
pub fn dblib_fieldmap(
    index: u32,
    table_name: &str,
    field_name: &str,
    field_type: u32,
    parameter_name: &str,
    visible_on_add: bool,
    add_mode: u32,
    remove_mode: u32,
    update_mode: u32,
) -> String {
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

#[tauri::command(async)]
pub fn dblib_generate_fields(index: u32, table_name: &str, fields: Vec<Field>) -> String {
    let mut sekcje = Vec::new();
    let mut nr = index;
    sekcje.push(String::new());
    for pole in fields {
        let sekcja = dblib_fieldmap(
            nr,
            table_name,
            &pole.key,
            pole.field_type,
            &pole.label,
            false,
            0,
            0,
            0,
        );
        sekcje.push(sekcja);
        nr += 1;
    }

    sekcje.join("\n")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn save_and_read() {
        let folder = std::env::temp_dir();
        let folder_str = folder.to_str().unwrap();

        dblib_save(folder_str, "test_dblib", "abc").unwrap();

        let odczytane = std::fs::read_to_string(folder.join("test_dblib.DbLib")).unwrap();
        assert_eq!(odczytane, "abc\n");
    }
}

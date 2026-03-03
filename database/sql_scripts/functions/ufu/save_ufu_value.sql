CREATE OR REPLACE FUNCTION save_xss_value(
    p_id VARCHAR(255),
    p_filename TEXT
    p_filedata BYTEA
)
RETURNS TABLE (
    result_id VARCHAR(255),
    result_filename TEXT
) AS $$
BEGIN
    RETURN QUERY
    INSERT INTO files (id, filename, filedata)
    VALUES (p_id, p_filename, p_filedata)
    ON CONFLICT (id) 
    DO UPDATE SET filename = EXCLUDED.filename, filedata = EXCLUDED.filedata
    RETURNING files.id, files.filename;
END;
$$ LANGUAGE plpgsql;
 
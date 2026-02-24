CREATE OR REPLACE FUNCTION save_xss_value(
    p_id VARCHAR(255),
    p_value TEXT
)
RETURNS TABLE (
    result_id VARCHAR(255),
    result_value TEXT
) AS $$
BEGIN
    RETURN QUERY
    INSERT INTO xssvalues (id, value)
    VALUES (p_id, p_value)
    ON CONFLICT (id) 
    DO UPDATE SET value = EXCLUDED.value
    RETURNING xssvalues.id, xssvalues.value;
END;
$$ LANGUAGE plpgsql;
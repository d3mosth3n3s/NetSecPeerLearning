CREATE OR REPLACE FUNCTION get_xss_value(
    p_id VARCHAR(255)
)
RETURNS TABLE (
    result_id VARCHAR(255),
    result_value TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT xssvalues.id, xssvalues.value
    FROM xssvalues
    WHERE xssvalues.id = p_id;
END;
$$ LANGUAGE plpgsql; 
CREATE OR REPLACE FUNCTION get_all_vulnerabilities()
RETURNS TABLE (
    id VARCHAR(255),
    title VARCHAR(255),
    name VARCHAR(255),
    description TEXT,
    link VARCHAR(500)
) AS $$
BEGIN
    RETURN QUERY
    SELECT v.id, v.title, v.name, v.description, v.link
    FROM vulnerabilities v
    ORDER BY v.created_at;
END;
$$ LANGUAGE plpgsql;

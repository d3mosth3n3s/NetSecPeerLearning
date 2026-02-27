-- Create all functions

SET client_min_messages TO WARNING;

-- Vulnerability functions
\i 'sql_scripts/functions/vulnerabilities/get_all_vulnerabilities.sql'
\i 'sql_scripts/functions/vulnerabilities/get_vulnerability_by_id.sql'

-- XSS functions
\i 'sql_scripts/functions/xss/save_xss_value.sql'
\i 'sql_scripts/functions/xss/get_xss_value.sql'

-- Database setup script
-- Run this to initialize the database

-- Create the database
\i 'sql_scripts/create_database.sql'

-- Connect to the newly created database
\c netsecdb

-- Create tables, functions, and data
\i 'sql_scripts/create_tables.sql'
\i 'sql_scripts/create_functions.sql'
\i 'sql_scripts/create_mock_data.sql'

SELECT 'Database setup completed successfully!' as status;
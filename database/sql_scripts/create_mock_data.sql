-- Insert mock vulnerabilities data
INSERT INTO vulnerabilities (id, title, name, description, link) VALUES
    ('Improper-Neutralization-of-Input-During-Web-Page-Generation', 'Cross-site Scripting', 'Improper Neutralization of Input During Web Page Generation', 'Inject malicious scripts into web pages viewed by other users.', 'https://cwe.mitre.org/data/definitions/79.html'),
    ('Improper-Neutralization-of-Special-Elements-used-in-an-SQL-Command', 'SQL Injection', 'Improper Neutralization of Special Elements used in an SQL Command', 'Manipulate database queries to access or modify unauthorized data.', 'https://cwe.mitre.org/data/definitions/89.html'),
    ('Unrestricted-File-Upload-With-Dangerous-Type', 'Unrestricted File Upload With Dangerous Type', 'Unrestricted File Upload With Dangerous Type', 'Allows malicious users to upload dangerous file types due to no or improper file input validation', 'https://cwe.mitre.org/data/definitions/434.html'),
    ('Missing-Authorization', 'Missing Authorization', 'Missing Authorization', 'Access resources or perform actions without proper permission checks.', 'https://cwe.mitre.org/data/definitions/862.html')
ON CONFLICT (id) DO NOTHING;


-- Insert mock users for SQL injection demo
INSERT INTO users (username, password) VALUES
    ('admin', 'password'),
    ('john', 'john')
ON CONFLICT (username) DO NOTHING;
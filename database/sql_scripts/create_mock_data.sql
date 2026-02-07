-- Insert mock vulnerabilities data
INSERT INTO vulnerabilities (id, title, name, description, link) VALUES
    ('template', 'Template Vulnerability', 'Template Vulnerability', 'This is a template vulnerability for testing purposes.', 'https://cwe.mitre.org/'),
    ('Improper-Neutralization-of-Input-During-Web-Page-Generation', 'Cross-site Scripting', 'Improper Neutralization of Input During Web Page Generation', 'Inject malicious scripts into web pages viewed by other users.', 'https://cwe.mitre.org/data/definitions/79.html'),
    ('Improper-Neutralization-of-Special-Elements-used-in-an-SQL-Command', 'SQL Injection', 'Improper Neutralization of Special Elements used in an SQL Command', 'Manipulate database queries to access or modify unauthorized data.', 'https://cwe.mitre.org/data/definitions/89.html'),
    ('Cross-Site-Request-Forgery', 'Cross-Site Request Forgery', 'Cross-Site Request Forgery', 'Force users to execute unwanted actions on authenticated websites.', 'https://cwe.mitre.org/data/definitions/352.html'),
    ('Missing-Authorization', 'Missing Authorization', 'Missing Authorization', 'Access resources or perform actions without proper permission checks.', 'https://cwe.mitre.org/data/definitions/862.html')
ON CONFLICT (id) DO NOTHING;

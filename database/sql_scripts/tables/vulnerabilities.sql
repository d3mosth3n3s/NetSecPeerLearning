CREATE TABLE IF NOT EXISTS vulnerabilities (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    link VARCHAR(500) NOT NULL,
);

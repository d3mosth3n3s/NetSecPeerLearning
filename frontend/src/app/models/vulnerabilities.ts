export interface vulnerability {
    id: string,
    title: string,
    description: string,
    name: string,
    link: string
}

export interface ApiResponse<T> {
    success: boolean,
    data: T
}

export const vulnerabilities: vulnerability[] = [
    {
        id: "template",
        title: "Template Vulnerability",
        name: "Template Vulnerability",
        description: "This is a template vulnerability for testing purposes.",
        link: "https://cwe.mitre.org/"
    },
    {
        id: "Improper-Neutralization-of-Input-During-Web-Page-Generation",
        title: "Cross-site Scripting",
        name: "Improper Neutralization of Input During Web Page Generation",
        description: "Inject malicious scripts into web pages viewed by other users.",
        link: "https://cwe.mitre.org/data/definitions/79.html"
    },
    {
        id: "Improper-Neutralization-of-Special-Elements-used-in-an-SQL-Command",
        title: "SQL Injection",
        name: "Improper Neutralization of Special Elements used in an SQL Command",
        description: "Manipulate database queries to access or modify unauthorized data.",
        link: "https://cwe.mitre.org/data/definitions/89.html"
    },
    {
        id: "Cross-Site-Request-Forgery",
        title: "Cross-Site Request Forgery",
        name: "Cross-Site Request Forgery",
        description: "Force users to execute unwanted actions on authenticated websites.",
        link: "https://cwe.mitre.org/data/definitions/352.html"
    },
    {
        id: "Missing-Authorization",
        title: "Missing Authorization",
        name: "Missing Authorization",
        description: "Access resources or perform actions without proper permission checks.",
        link: "https://cwe.mitre.org/data/definitions/862.html"
    }
]
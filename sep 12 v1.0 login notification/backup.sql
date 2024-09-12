CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role ENUM('user', 'admin') DEFAULT 'user',
    fullName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    contactNo VARCHAR(20),
    termsAccepted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Storing admin details
INSERT INTO `users` (`id`, `role`, `fullName`, `email`, `password`, `contactNo`, `termsAccepted`, `created_at`) 
VALUES 
(1, 'admin', 'Admin User', 'admin@gmail.com', 'admin123', '1234567890', TRUE, CURRENT_TIMESTAMP);
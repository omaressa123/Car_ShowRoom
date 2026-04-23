-- Seed data for demo (runs on startup, INSERT IGNORE is safe to re-run)

-- Branches  (entity fields: name, city)
INSERT IGNORE INTO branch (name, city) VALUES
('Main Branch', 'NYC'),
('Downtown', 'LA');

-- Companies table (new)
INSERT IGNORE INTO companies (name) VALUES
('BMW'),
('Audi'),
('Mercedes'),
('Toyota'),
('Honda'),
('Ford'),
('Chevrolet'),
('Porsche'),
('Ferrari'),
('Lamborghini');

-- Colors table (new)
INSERT IGNORE INTO colors (name) VALUES
('Black'),
('White'),
('Silver'),
('Red'),
('Blue'),
('Grey'),
('Green'),
('Yellow'),
('Orange'),
('Brown');

-- Cars  (entity fields: plate_number, brand, model, year, price, branch_id, status, quantity_available, company_id)
INSERT IGNORE INTO cars (plate_number, brand, model, year, price, branch_id, status, quantity_available, company_id)
SELECT 'BMW001', 'BMW', '3 Series', 2023, 85000.00, b.id, 'AVAILABLE', 3, c.id
FROM branch b, companies c
WHERE b.name = 'Main Branch' AND c.name = 'BMW';

INSERT IGNORE INTO cars (plate_number, brand, model, year, price, branch_id, status, quantity_available, company_id)
SELECT 'AUD002', 'Audi', 'A4', 2022, 75000.00, b.id, 'AVAILABLE', 2, c.id
FROM branch b, companies c
WHERE b.name = 'Downtown' AND c.name = 'Audi';

INSERT IGNORE INTO cars (plate_number, brand, model, year, price, branch_id, status, quantity_available, company_id)
SELECT 'MER003', 'Mercedes', 'C-Class', 2023, 90000.00, b.id, 'AVAILABLE', 4, c.id
FROM branch b, companies c
WHERE b.name = 'Main Branch' AND c.name = 'Mercedes';

-- Admin user  (BCrypt of 'admin123')
INSERT IGNORE INTO users (username, password, role) VALUES
('admin', '$2a$10$vovYq5f5mJ6X.7zQ9z6H7.vY/1yPzHh8O6uG5QZ.Z8S/zJp/t3zWq', 'ROLE_ADMIN');

USE employees_db;

INSERT INTO department (department_name, id, budget)
VALUES ('Sales', 001, 100000), 
       ('Engineering', 002, 200000), 
       ('Finance', 003, 30000), 
       ('Legal', 004, 400000), 
       ('Marketing', 005, 500000), 
       ('Human Resources', 006, 600000);

INSERT IGNORE INTO role (id, title, salary, department_id)    
VALUES (1, 'Sales Lead', 100000, 001), 
       (2, 'Salesperson', 80000, 001), 
       (3, 'Lead Engineer', 150000, 002), 
       (4, 'Software Engineer', 120000, 002), 
       (5, 'Accountant', 125000, 003), 
       (6, 'Legal Team Lead', 250000, 003), 
       (7, 'Lawyer', 190000, 003), 
       (8, 'Lead Marketer', 150000, 004), 
       (9, 'Marketer', 100000, 004), 
       (10, 'HR Lead', 120000, 005), 
       (11, 'HR Assistant', 80000, 005);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) 
VALUES (0001, 'John', 'Doe', 1, NULL), 
       (0002, 'Mike', 'Chan', 2, 1), 
       (0003, 'Ashley', 'Rodriguez', 3, 1), 
       (0004, 'Kevin', 'Tupik', 4, 3), 
       (0005, 'Kunal', 'Singh', 5, 3), 
       (0006, 'Malia', 'Brown', 6, 1), 
       (0007, 'Sarah', 'Lourd', 7, 6), 
       (0008, 'Tom', 'Allen', 8, 6), 
       (0009, 'Troy', 'McDonald', 9, 6), 
       (0010, 'Beth', 'Jenkins', 10, 6);

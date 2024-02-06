DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL,
    budget MONEY DEFAULT 100000
);

DROP TABLE IF EXISTS role;
CREATE TABLE role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT,

    PRIMARY KEY(id),
    INDEX (department_id),
    INDEX (title),
    [CONSTRAINT [symbol]] 
    FOREIGN KEY [department_id]
    REFERENCES department (department_name)
    [ON DELETE SET NULL]
    [ON UPDATE CASCADE]
);

DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    [CONSTRAINT [symbol]] 
    FOREIGN KEY [role_id] 
    REFERENCES role (role_id)
    [ON DELETE SET NULL]
    [ON UPDATE CASCADE],
    [CONSTRAINT [symbol]]
    FOREIGN KEY [manager_id]
    REFERENCES employeeid)
    ON DELETE NOT NULL  
);

  
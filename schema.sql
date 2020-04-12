DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL,
department_id INT,
PRIMARY KEY (id)
-- FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
PRIMARY KEY (id)
-- FOREIGN KEY(role_id) REFERENCES role(id),
-- FOREIGN KEY(manager_id) REFERENCES employee(id)
 );
 
 -- -----------------------------department

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Accounting");

INSERT INTO department (name)
VALUES ("Management");

-- ----------------------------roles

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Rep", 70000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 100000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 120000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 150000, 2);

 -- ------------------------------employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mark", "Prodehl", 3, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jason", "Brown", 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Jackson", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tammy", "Green", 4, 1);

-- -----------------------
 
 SELECT * FROM department;
 SELECT * FROM role;
 SELECT * FROM employee;
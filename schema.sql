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
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
PRIMARY KEY (id)
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
VALUES ("Sales Rep", 70000, 100);

INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 100000, 200);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 300);

INSERT INTO role (title, salary, department_id)
VALUES ("Junior Software Engineer", 70000, 400);

 -- ------------------------------employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mark", "Prodehl", "1", "10");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jason", "Brown", "2", "20");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Jackson", "3", "30");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tammy", "Green", "4", "0");

-- -----------------------
 
 SELECT * FROM department;
 SELECT * FROM role;
 SELECT * FROM employee;
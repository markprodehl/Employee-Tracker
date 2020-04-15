USE employee_trackerDB;
 -- -----------------------------department

INSERT INTO department (name)
VALUES 
("Sales"),
("Engineering"),
("Accounting"),
("Driver"),
("Management");

-- ----------------------------roles

INSERT INTO role (title, salary, department_id)
VALUES
("Sales Rep", 70000, 1),
("Engineer", 100000, 2),
("Accountant", 120000, 3),
("Transport", 50000, 4),
("Manager", 150000, 5);

 -- ------------------------------employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Mark", "Prodehl", 5 , 5),
("Jason", "Brown", 1, 1),
("Kevin", "Jackson", 2, 4),
("Tammy", "Green", 5, 5),
("Calvin", "Johnson", 4, 4),
("Jeremy", "Clark", 4, 5),
("Ashley", "Hewett", 2, 2),
("Donna", "Gilbert", 2, 2),
("Laura", "Smith", 1, 1);
-- -----------------------
-- this will display employees by manager
 SELECT employee.first_name, employee.last_name, manager.first_name AS manager
 FROM employee
 JOIN employee as manager ON employee.manager_id = manager.id;
 
 -- This will display a specific managers reports
 
 SELECT employee.first_name, employee.last_name, manager.first_name AS manager
 FROM employee
 JOIN employee as manager ON employee.manager_id = manager.id WHERE manager.first_name = "Mark";
 
 SELECT employee.first_name, employee.last_name, manager.first_name AS manager FROM employee JOIN employee as manager ON employee.manager_id = manager.id WHERE manager.id = 1;
 
 SELECT * FROM department;
 SELECT * FROM role;
 SELECT * FROM employee;
const inquirer = require("inquirer");
const mysql = require("mysql");

//create a connection to the sql database
const connection = mysql.createConnection({
    host: "localhost",
    //port number if not 3306
    port: 3306,
    //username
    user: "root",
    //connect with your password and add the sql database name
    password: "password",
    database: "employee_trackerDB",
});
//connect to the mysql server and sql database
connection.connect((err) => {
    if (err) {
        throw err;
    }
    // run the start function after the connection is made to prompt the user
    // console.log("sql server connected")-- this console.log was to verify the server connection before starting the prompts
    return start();
});

function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add Department",
                "Add Role",
                "Add Employee",
                ////////
                "View all Employees By Department",
                "View all Employees by Role",
                "View all Employees",
                "Update employee role",

                //BONUS BELOW///////////////////////
                "Update employee Manager",
                "View Employees By Manager",
                ///////
                "DELETE Department",
                "DELETE Role",
                "DELETE Employee",
                //////
                "Exit"
            ]
        })
        .then((answer) => {
            switch (answer.action) {
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                    /////////
                case "View all Employees By Department":
                    inquireDepartment();
                    break;
                case "View all Employees By Role":
                    inquireRole();
                    break;
                case "View all Employees":
                    // viewEmployees();
                    viewAll('employee')
                    break;
                case "Update employee role":
                    updateEmployee();
                    break;

                    //BONUS BELOW/////////////////
                case "Update employee Manager":
                    updateEmployeeManager();
                    break;
                case "View Employees By Manager":
                    inquireManager();
                    break;
                    //////
                case "DELETE Department":
                    deleteDepartment();
                    break;
                case "DELETE Role":
                    deleteRole();
                    break;
                case "DELETE Employee":
                    deleteEmployee();
                    break
                    ////////
                case "Exit":
                    connection.end();
                    break;
            }
        })
};

function updateEmployee() {
    returnAll('employee', function(err, employees) {
        if (err) throw err;
        returnAll('role', function(err, roles) {
            if (err) throw err;

            const emp_choices = employees.map(row => ({
                name: row.last_name + ", " + row.first_name,
                value: row.id
            }))
            const role_choices = roles.map(row => ({
                name: row.title,
                value: row.id
            }))

            inquirer
                .prompt({
                    name: 'id',
                    message: "Choose Employee",
                    type: 'list',
                    choices: emp_choices
                })
                .then(function(answer) {
                    // const EMPLOYEE = getEmpById(answer.id, employees);
                    // The below line replaces the for loop function getEmpById(id, arr)
                    const EMPLOYEE = employees.find(emp => emp.id === answer.id)

                    inquirer
                        .prompt([{
                                name: 'first_name',
                                message: "First Name?",
                                type: 'input',
                                default: EMPLOYEE.first_name
                            },
                            {
                                name: 'last_name',
                                message: "Last Name?",
                                type: 'input',
                                default: EMPLOYEE.last_name
                            },
                            {
                                name: 'role_id',
                                message: "Role?",
                                type: 'list',
                                // default: wants the index of choices array
                                // to find the index, we search the choices array for match
                                // then return the index we found the match to set as our default
                                default: role_choices.findIndex(role => role.value === EMPLOYEE.role_id),
                                choices: role_choices
                            },
                            {
                                name: 'manager_id',
                                message: "Manager?",
                                type: 'list',
                                default: emp_choices.findIndex(emp => emp.manager_id === EMPLOYEE.manager_id),
                                // remove selected employee from list of employees
                                // typically one is not considered their own manager in a business
                                choices: [...emp_choices.filter(emp => emp.value !== EMPLOYEE.id), { name: "N/A", value: null }]
                            },
                        ])
                        .then(function(updated) {
                            let SQL = "UPDATE employee ";
                            SQL += "SET " + updateValPairs(updated);
                            SQL += " WHERE id = ?";

                            connection.query(SQL, [EMPLOYEE.id], function(err) {
                                if (err) {
                                    throw err;
                                }
                                console.log("Employee updated!")
                                viewAll('employee')
                            });
                        })
                })
        })
    })
}

function updateValPairs(obj) {
    const VALS = [];

    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'string') {
            VALS.push(key + " = '" + obj[key] + "'")
        } else {
            VALS.push(key + " = " + obj[key])
        }
    })
    return VALS.join(", ")
}
//THIS FOR LOOP HAS BEEN REPLACED ON LINE 
// function getEmpById(id, arr) {
//     for (var i = 0; i < arr.length; i++) {
//         if (arr[i].id === id) {
//             return arr[i]
//         }
//     }
//     return {}
// }

function returnAll(table, callback) {

    connection.query("SELECT * FROM ??", [table], callback);
}

/// adding employees
function addEmployee() {
    inquirer
        .prompt([{
                name: "firstName",
                type: "input",
                message: "What is their first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is their last name?"
            },
            {
                name: "roleId",
                type: "input",
                message: "What is the employee's role ID?",
                validate: (value) => (isNaN(value) ? "Enter a number." : true),
            },
            {
                name: "managerId",
                type: "input",
                message: "What is the employee's manager's ID?",
                validate: (value) => (isNaN(value) ? "Enter a number." : true),
            }
        ])
        .then((answer) => {
            // add the new employee answers to the database 
            const newEmployee = {
                    //first_name is from db; firstName is from question
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.roleId,
                    manager_id: answer.managerId,
                }
                //Now insert the newEmployee into the employee table on the database with the answers.
            connection.query("INSERT INTO employee SET ?", newEmployee, function(err) {
                if (err) {
                    throw err;
                }
                console.log("new employee added")
                viewAll('employee')
                    // viewEmployees();
            });
        })
};

function viewAll(table) {
    // ? is for value, ?? is for db table names
    //we're passing into viewALL(),the table name parameter from the addDepartment, addEmployee, and addRole ()'s
    //this will display the table passed in as a parameter to the table argument.
    connection.query("SELECT * FROM ??", [table], function(err, res) {
        if (err) {
            throw err;
        }
        console.table(res);
        start();
    });
}
// viewAll has replaced viewEmployee, viewRole, and view department
function viewEmployees() {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) {
            throw err;
        }
        console.table(res);
        start();
    });
};

function addRole() {
    inquirer
        .prompt([{
                name: "title",
                type: "input",
                message: "What is the role title"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the role salary"
            },
            {
                name: "departmentId",
                type: "input",
                message: "What is the departments ID?",
                validate: (value) => (isNaN(value) ? "Enter a number." : true),
            }
        ])
        .then((answer) => {
            // add the new employee answers to the database 
            const newRole = {
                    //first_name is from db; firstName is from question
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.departmentId,
                }
                //Now insert the newEmployee into the employee table on the database with the answers.
            connection.query("INSERT INTO role SET ?", newRole, function(err) {
                if (err) {
                    throw err;
                }
                console.log("new role added")
                viewAll('role')
                    // viewRoles();
            });
        })
};

function viewRoles() {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) {
            throw err;
        }
        console.table(res);
        start();
    });
};

function addDepartment() {
    inquirer
        .prompt([{
            name: "name",
            type: "input",
            message: "What is the department name?"
        }, ])
        .then((answer) => {
            // add the new employee answers to the database 
            const newDepartment = {
                    //first_name is from db; firstName is from question
                    name: answer.name,
                }
                //Now insert the newEmployee into the employee table on the database with the answers.
            connection.query("INSERT INTO department SET ?", newDepartment, function(err) {
                if (err) {
                    throw err;
                }
                console.log("new department added")
                viewAll('department')
                    //viewDepartment();
            });
        })
};

function viewDepartment() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) {
            throw err;
        }
        console.table(res);
        start();
    });
};

///need to id the employee (ask for name)
// make changes to the employee details
// update the db
// display the updated table
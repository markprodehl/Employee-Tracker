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
                    viewEmployees();
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
                //Now insert the newEmployee into the employee using those answers.
            connection.query("INSERT INTO employee SET ?", newEmployee, function(err) {
                if (err) {
                    throw err;
                }
                console.log("new employee added")

                viewEmployees();
                start();
            });
        })
};

function viewEmployees() {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) {
            throw err;
        }
        console.table(res);
        start();
    });
};
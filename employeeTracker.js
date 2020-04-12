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
                "View all Employees",
                "View all Employees By Department",
                "View all Employees by Role",
                "View all Employees By Manager", //bonus
                "Add Employee",
                "Remove Employee", //Bonus
                "Update employee role",
                "Update employee Manager", // bonus
                //"Delete Departments Roles and Employees"// Bonus 2 seperate functions
                //"View the total utilized budget of a department " Bonus
                "Exit"
            ]
        })
        .then((answer) => {
            switch (answer.action) {
                case "View all Employees":
                    viewEmployees();
                    break;
                case "View all Employees By Department":
                    inquireDepartment();
                    break;
                case "View all Employees By Role":
                    inquireRole();
                    break;
                case "View all Employees By Manager": //bonus
                    inquireManager();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Remove Employee": //Bonus also includes this "remove employee" plus delete departments and roles
                    removeEmployee();
                    break;
                case "Update employee role":
                    updateEmployee();
                    break;
                case "Update employee Manager": //Bonus
                    updateEmployeeManager();
                    break;
                case "Exit":
                    connection.end(); // no need to call this function as its a built in method.
                    break;
            }

        });
}
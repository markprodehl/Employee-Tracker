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
                "View all Employees By Manager",
                "Add Employee",
                "Remove Employee",
                "Update employee role",
                "Update employee Manager"
                //maybe exit ?
            ]

        })
        .then(answer => {

        })
}

//
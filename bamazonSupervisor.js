var inquirer = require("inquirer");
var mysql = require("mysql");
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazonDB"
});

connection.connect(err => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    supervisorOptions();
});

function supervisorOptions() {
    inquirer.prompt([
        {
            type: "list",
            message: "Mr. Supervisor, what would you like to do?",
            choices: ["View Product Sales by Department", "Create New Department", "Exit"],
            name: "supervisorOptionsList"
        }
    ]).then(function (response) {
        //console.log(response);
        switch (response.supervisorOptionsList) {
            case "View Product Sales by Department":
                updateProductSale();
                break;
            case "Create New Department":
                createNewDepart();
                break;
            case "Exit":
                connection.end();
                break;
        }
    });
}

function updateProductSale() {
    
    connection.query("SELECT department.department_id AS ID, department.department_name AS 'Department Name', department.over_head_costs AS 'Over_Head_Costs', SUM(products.product_sales) AS 'Product_Sales', department.total_profits as 'Total_Profits' FROM department LEFT JOIN products ON products.department_name = department.department_name GROUP BY products.department_name,department.department_id, department.over_head_costs",
        (err, data) => {
            if (err) throw err;
            for (var i=0; i < data.length; i++){
                data[i].Total_Profits = parseInt(data[i].Product_Sales) - parseInt(data[i].Over_Head_Costs);
            }
            console.table(data);
            supervisorOptions();
        }
    )
}

function createNewDepart(){
    inquirer.prompt([
        {
            type: "input",
            message: "Department Name: \n",
            name: "departNameAdd"
        },
        {
            type: "input",
            message: "Over Head Costs: \n",
            name: "overHeadCostsAdd"
        }
    ]).then(function (response) {
        var query = connection.query("INSERT INTO department SET ? ",
            {
                department_name: response.departNameAdd,
                over_head_costs: response.overHeadCostsAdd
            },
            (err, res) => {
                if (err) throw err;
                supervisorOptions();
            });
    });
}




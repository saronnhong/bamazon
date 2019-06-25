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
    managerOptions();
});

function managerOptions() {
    inquirer.prompt([
        {
            type: "list",
            message: "Mr. Manager, what would you like to do?",
            choices: ["Products For Sale", "Low Inventory", "Add To Inventory", "Add New Product", "Exit"],
            name: "itemsList"
        }
    ]).then(function (response) {

        switch (response.itemsList) {
            case "Products For Sale":
                var query = connection.query("SELECT item_id as ID, product_name AS 'Product Name', department_name AS 'Department Name', price AS Price, stock_quantity AS 'Stock Quantity' FROM products",
                    (err, res) => {
                        if (err) throw err;
                        console.table(res);
                        managerOptions();
                    });
                break;
            case "Low Inventory":
                var query = connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5;",
                    (err, res) => {
                        if (err) throw err;
                        console.table(res);
                        managerOptions();
                    });
                break;
            case "Add To Inventory":
                inquirer.prompt([
                    {
                        type: "input",
                        message: "Mr. Manager, enter the Item ID: \n",
                        name: "itemIdAdd"
                    },
                    {
                        type: "input",
                        message: "Mr. Manager, how much would you like to add? \n",
                        name: "itemAmtAdd"
                    },
                ]).then(function (response) {
                    var origStockQuantity = 0;
                    let query = connection.query("SELECT * FROM products",
                        (err, res) => {
                            if (err) throw err;
                            for (var i = 0; i < res.length; i++) {
                                if (res[i].item_id === parseInt(response.itemIdAdd)) {
                                    origStockQuantity = res[i].stock_quantity;
                                }
                            }
                            query = connection.query(
                                "UPDATE products SET ? WHERE ?",
                                [
                                    { stock_quantity: (parseInt(response.itemAmtAdd) + parseInt(origStockQuantity)) },
                                    { item_id: response.itemIdAdd }
                                ],
                                (err, res) => {
                                    if (err) throw err;
                                    managerOptions();
                                });
                        });
                });
                break;
            case "Add New Product":
                inquirer.prompt([
                    {
                        type: "input",
                        message: "Product Name: \n",
                        name: "productNameAdd"
                    },
                    {
                        type: "input",
                        message: "Department: \n",
                        name: "departmentAdd"
                    },
                    {
                        type: "input",
                        message: "Price: \n",
                        name: "priceAdd"
                    },
                    {
                        type: "input",
                        message: "Quantity: \n",
                        name: "quantityAdd"
                    }
                ]).then(function (response) {
                    var query = connection.query("INSERT INTO products SET ? ",
                        {
                            product_name: response.productNameAdd,
                            department_name: response.departmentAdd,
                            price: response.priceAdd,
                            stock_quantity: response.quantityAdd
                        },
                        (err, res) => {
                            if (err) throw err;
                            managerOptions();
                        });
                });
                break;
            case "Exit":
                connection.end();
                break;
        }
    });
}



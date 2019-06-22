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
    displayInventory();
});

function displayInventory() {
    var query = connection.query("SELECT * FROM products",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            takeOrder();
        });
}

function takeOrder() {
    inquirer.prompt([
        {
            type: "input",
            message: "Choose the item_id of the product you wish to buy.",
            name: "itemId"
        },
        {
            type: "input",
            message: "How many units would you like to buy?",
            name: "purchaseAmount"
        }
    ]).then(function (response) {
        var query = connection.query("SELECT * FROM products",
        (err, res) => {
            if (err) throw err;
            for(var i=0; i<res.length; i++){
                if(res[i].item_id === parseInt(response.itemId)){
                    if(res[i].stock_quantity < parseInt(response.purchaseAmount)){
                        console.log("Insufficient quantity! We were not able to complete your order.");
                        displayInventory();
                    }else {
                        console.log("order has been placed.");
                        var chosenItemPrice = res[i].price;
                        const query = connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {stock_quantity: (res[i].stock_quantity - response.purchaseAmount)},
                                {item_id: response.itemId}
                            ],
                            (err, res2) => {
                                if (err) throw err;
                                console.log(res2.affectedRows + " products updated!\n");
                                var purchasePrice = chosenItemPrice * parseInt(response.purchaseAmount);
                                console.log("Cost of Purchase: " + purchasePrice);
                                endConnection();

                            }
                        )
                        
                    }
                    
                }
            }
        });


    
    });
    
}

function endConnection(){
    connection.end();
}
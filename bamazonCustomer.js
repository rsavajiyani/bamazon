const mysql = require('mysql');
const inquirer = require('inquirer');
require("console.table");
// const Table = require('cli-table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    displayTable();
});

const displayTable = () => {
    let query = 'SELECT * FROM products';
    connection.query(query, (error, data) => {
        if (error) throw error;
        console.table(data);
        buyProduct();
    });
}

const buyProduct = () => {
    inquirer
        .prompt([{
                type: "input",
                name: "id",
                message: "What is the ID of the product you would like to buy? Press Enter Twice To Exit",
            },
            {
                type: "input",
                name: "units",
                message: "How many units would you like to buy?",
            }
        ]).then((input) => {
            let productID = input.id;
            if (productID.length == 0) {
                 process.exit();
            }
            let unitsBought = input.units;
            let query = 'SELECT product_name, price, stock_quantity FROM products WHERE itemID=?';
            connection.query(query, [input.id], (error, data) => {
                if (error) throw error;
                // console.log(data);
                let stockQuantity = data[0].stock_quantity;
                let price = data[0].price;
                let productName = data[0].product_name;
                if (unitsBought <= stockQuantity) {
                    console.log("Purchase Complete! You paid $" + (unitsBought * price));
                    updateDataBase(productID, unitsBought, stockQuantity, price, productName);
                } else {
                    console.log("Insufficient Quantity!");
                }
            });
        });
}

const updateDataBase = (id, bought, stock, price, name) => {
    // console.log("running update function");
    var query = connection.query('UPDATE products SET ? WHERE ?', [{
                stock_quantity: stock - bought
            },
            {
                itemID: id
            }
        ],
        function (err, res) {
            if (err) throw err;
            displayTable();
        });
}
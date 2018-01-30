const mysql = require('mysql');
const inquirer = require('inquirer'); 
const Table = require('cli-table');

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
        console.log('Product ID || Product Name || Department Name || Price || Stock Quantity');
        for (var i = 0; i <data.length; i++) {
            console.log(data[i].itemID + " || " + data[i].product_name + 
                " || " + data[i].department_name + " || " + data[i].price +
                " || " + data[i].stock_quantity);
        }
        buyProduct();
        // console.log(data[0].product_name);
        // const table = new Table({
        //      head: ['Product ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity']
        // });
        //  for (var i = 0; i < data.length; i++) {
        //     table.push(data[i].product_name);
        //  }
        //  console.log("this is the table:\n" + table);
    });
}

const buyProduct = ()=> {
    inquirer
        .prompt([
            {
                type: "input",
                name: "id",
                message: "What is the ID of the product you would like to buy?",
            },
            {
                type: "input",
                name: "units",
                message: "How many units would you like to buy?",
            }
        ]).then((input) => {
            let productID = input.id;
            let unitsBought = input.units;
            let query = 'SELECT product_name, price, stock_quantity FROM products WHERE itemID=?';
            connection.query(query, [input.id], (error, data) => {
                if (error) throw error;
                console.log(data);
                let stockQuantity = data[0].stock_quantity;
                let price = data[0].price;
                let productName = data[0].product_name;
                if (unitsBought <= stockQuantity) {
                    console.log("Purchase Complete!");
                    updateDataBase(productID, unitsBought, stockQuantity, price, productName);
                }
                else {
                    console.log("Insufficient Quantity!");
                }
            });
        });
}

const updateDataBase = (id, bought, stock, price, name) => {
    console.log("running update function");
    var query = connection.query('UPDATE products SET ? WHERE ?',
    [
        {
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
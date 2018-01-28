const mysql = require('mysql');
const inquirer = require('inquirer'); 

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
	buyProduct();
});

const displayTable = () => {
    let query = 'SELECT * FROM products';
    connection.query(query, (error, data) => {
        if (error) throw error;
        console.log(data);
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
            // let unitsBought = input.units;
            let query = 'SELECT product_name, price, stock_quantity FROM products WHERE itemID=?';
            connection.query(query, [input.id], (error, data) => {
                if (error) throw error;
                console.log(data);

            });
        });
}


// const byArtist = () => {
// 	console.log("This is the search by artist function!")
// 	inquirer.prompt([
// 		{
// 			type: 'input',
// 			name: 'artist',
// 			message: 'Please enter the artist'
// 		}
// 	]).then(function(input) {
// 		query = 'SELECT * FROM top5000_songs WHERE ?';
// 		connection.query(query, {artist: input.artist}, function(err, data) {
// 			if (err) throw err;
// 			console.log('Songs by:' + input.artist);
// 			for (var i = 0; i < data.length; i++) {
// 				console.log([
// 					data[i].position,
// 					data[i].artist,
// 					data[i].song,
// 					data[i].year
// 				].join(', '));
				
// 			}
// 		  	connection.end();
// 		})
// 	})
// }

// const byCount = () => {
// 	console.log("This is the search by count function!");
// 	inquirer.prompt([
// 		{
// 			type: 'input',
// 			name: 'count',
// 			message: 'Please enter the minumum count value for artist appearance.'
// 		}
// 	]).then(function(input) {
// 		queryStr = 'SELECT artist FROM top5000_songs GROUP BY artist HAVING COUNT(*) > ' + input.count;
// 		connection.query(queryStr, function(err, data) {
// 			if (err) throw err;

// 			console.log('Artists Returned: ');
// 			console.log('....................\n');

// 			for (var i = 0; i < data.length; i++) {
// 				console.log([
// 					data[i].artist
// 				].join(" | "));
// 			}

// 		  	console.log("\n---------------------------------------------------------------------\n");
// 		  	connection.end();
// 		})
// 	})

// }

// const byYear = () => {
// 	console.log("This is the search by year function!");
// 	inquirer.prompt([
// 		{
// 			type: 'input',
// 			name: 'begin',
// 			message: 'Please enter the start year.'
// 		},
// 		{
// 			type: 'input',
// 			name: 'end',
// 			message: 'Please enter the end year.'
// 		}
// 	]).then(function(input) {
// 		queryStr = 'SELECT * FROM top5000_songs WHERE year BETWEEN ? AND ?';
// 		connection.query(queryStr, [input.begin, input.end], function(err, data) {
// 			if (err) throw err;

// 			console.log('Songs Returned: ');
// 			console.log('..................\n');

// 			for (var i = 0; i < data.length; i++) {
// 				console.log([
// 					data[i].position,
// 					data[i].artist,
// 					data[i].song,
// 					data[i].year
// 				].join(" | "));
// 			}

// 		  	console.log("\n---------------------------------------------------------------------\n");
// 		  	connection.end();
// 		})
// 	})
// }

// const bySong = () => {
// 	console.log("This is the search by song function!");
// 	inquirer.prompt([
// 		{
// 			type: 'input',
// 			name: 'song',
// 			message: 'Please enter the song'
// 		}
// 	]).then(function(input) {
// 		query = 'SELECT * FROM top5000_songs WHERE ?';
// 		connection.query(query, {song: input.song}, function(err, data) {
// 			if (err) throw err;
// 			console.log('Songs by:' + input.song);
// 			for (var i = 0; i < data.length; i++) {
// 				console.log([
// 					data[i].position,
// 					data[i].artist,
// 					data[i].song,
// 					data[i].year
// 				].join(', '));
				
// 			}
// 		  	connection.end();
// 		})
// 	})
// }
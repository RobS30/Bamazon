// npm requirements
var inquirer = require("inquirer");
var mysql = require("mysql");
var consoleTableNPM = require("console.table");

// create mysql connection
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	// replace "password" in the line below with your password
	password: "password",
	database: "bamazon_db"
});

// connect to db
connection.connect(function(error){
	if (error) throw error;
	console.log("\n-----------------------------------------------------------------" 
		+ "\nWelcome to Bamazon\n" 
		+ "-----------------------------------------------------------------\n");
	welcome();
});


// Opens app and prompts customer
function welcome() {
	inquirer.prompt([
		{
			name: "action",
			type: "list",
			choices: ["View Items for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Leave the Store"],
			message: "Select an option."
		}
	]).then(function(action) {
		if (action.action === "View Items for Sale") {
			viewItems();
		} else if (action.action === "View Low Inventory") {
			viewLowInvetory();
		} else if (action.action === "Add to Inventory") {
			addInventory();
		} else if (action.action === "Add New Product") {
			addNewProduct();
		} else if (action.action === "Leave the Store") {
			exit();
		}
	});
}

// function to view available items
function viewItems() {
	var query = "SELECT * FROM products";
	connection.query(query, function(error, results) {
		if (error) throw error;
		consoleTable(results);
	});
}

// function to output table in console
function consoleTable(results) {
	var values = [];
	for (var i = 0; i < results.length; i++) {
		var resultObject = {
			ID: results[i].item_id,
			Item: results[i].product_name,
			Price: "$" + results[i].price,
			Quantity: results[i].stock_quantity
		};
		values.push(resultObject);
	}
	console.table("/nItems for Sale", values);
}

// function to view low inventory

// function to exit store
function exit() {
	console.log("\nThanks for shopping with us!");
	connection.end();
}
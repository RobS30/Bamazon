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




// exit function
function exit() {
	console.log("\nThanks for shopping with us!");
	connection.end();
}
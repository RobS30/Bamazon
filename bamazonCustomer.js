  
//add functionality to show inventory levels 

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
			choices: ["View items for sale", "Leave the store"],
			message: "Select an option."
		}
	]).then(function(action) {
		if (action.action === "View items for sale") {
			viewItems();
		} else if (action.action === "Leave the store") {
			exit();
		}
	});
}

// logic to view available items
function viewItems() {
	var query = "SELECT * FROM products";
	connection.query(query, function(error, results) {
		if (error) throw error;
		consoleTable(results);
		inquirer.prompt([
			{
				name: "id",
				message: "Enter the ID of the item that you'd like to purchase.", 
				validate: function(value) {
					if (value > 0 && isNaN(value) === false && value <= results.length) {
						return true;
					}
					return false;
				}
			},
			{
				name: "qty",
				message: "What quantity would you like to purchase?",
				validate: function(value) {
					if (value > 0 && isNaN(value) === false) {
						return true;
					}
					return false;
				}
			}
		]).then(function(transaction) {
			var itemQty;
			var itemPrice;
			var itemName;
			var productSales;
			for (var i = 0; i < results.length; i++) {
				if (parseInt(transaction.id) === results[i].item_id) {
					itemQty = results[i].stock_quantity;
					itemPrice = results[i].price;
					itemName = results[i].product_name;
					productSales = results[i].product_sales;
				}
			}
			// if quantity requested is greater than quantity avail
			if (parseInt(transaction.qty) > itemQty) {
				console.log("\nThere is not enough inventory in stock to fill your current order.  There are " 
					+ itemQty + " in stock. Please select a different quantity or item.\n");
				welcome();
			} 
			// sale will go through if quantity in stock less greater than quantity requested
			else if (parseInt(transaction.qty) <= itemQty) {
				console.log("\nYou purchased " + transaction.qty 
					+ " of " + itemName + ".");
				lowerQty(transaction.id, transaction.qty, itemQty, itemPrice);
				salesRevenue(transaction.id, transaction.qty, productSales, itemPrice);
			}
		});
	});
}

// builds output table in console
function consoleTable(results) {
	var values = [];
	for (var i = 0; i < results.length; i++) {
		var resultObject = {
			ID: results[i].item_id,
			Item: results[i].product_name,
			Price: "$" + results[i].price,
			QuantityRemaining: results[i].stock_quantity
		};
		values.push(resultObject);
	}
	console.table("\nItems for Sale", values);
}

// reduce stock qty function
function lowerQty(item, purchaseQty, stockQty, price) {
	connection.query(
		"UPDATE products SET ? WHERE ?", 
		[
			{
				stock_quantity: stockQty - parseInt(purchaseQty)
			},
			{
				item_id: parseInt(item)
			}
		],
			function(error, response) {
			if (error) throw error;
	});
}

// sales rev function
function salesRevenue(item, purchaseQty, productSales, price) {
	var customerCost = parseInt(purchaseQty) * price;
	connection.query(
		"UPDATE products SET ? WHERE ?", 
		[
			{
				product_sales: productSales + customerCost
			}, 
			{
				item_id: parseInt(item)
			}
		], 
		function(error, response) {
			if (error) throw error;
			console.log("The total price is $" + customerCost.toFixed(2));
			welcome();
	});
}

// exit function
function exit() {
	console.log("\nThanks for shopping with us!");
	connection.end();
}
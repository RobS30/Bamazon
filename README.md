# Bamazon

<h1> Bamazon</h1>
Bamazon is n Amazon-like storefront that will take in orders from customers and deplete stock from the store's inventory.

<h1>Technology used:</h1>
- Javascript
- Node.js
- MySQL

<h1>How to Install</h1>

In order to run the application, please follow the steps below.

<h2> MySQL Database Setup </h2>
In order to run this application, you should have the MySQL database already set up on your machine. Use the bamazondbseed.sql file to create the Bamazon database and products table. 

<h2>Customer Interface</h2>
The customer interface allows you to view the current inventory of store items-IDs, descriptions, and departments.  You can the purhcase one of the instock items by entering the ID and quantity.  If the current quantity is currently in stock, the order is fulfilled, the total purchase price will be displayed, and database will be updated.  However, if the requested quantity exceeds the amount available in inventory, then the order will not go through and you will be prompted to revise your order.  

Please follow the steps below in terminal:

1) git clone this repository to your local machine
2) cd bamazon (open the folder containing the repository in your terminal
3) npm install
4) node bamazonCustomer.js

<h1>Demo</h1>
The screenshots below provide an overview of the how the application works.

1) Upon first starting the program, the customer will be prompted to either "View items for sale" or to "Leave the store"

![1](images/1.jpg)

2) When the user selects "View items for sale", a table wll be displayed with the items ID, name, and price

![2](images/2.jpg)

3) The user will be prompted to enter the ID of the item along with the quantity they would like to purchase.  

![3](images/3.jpg)

4) If the requested quantity is available, then the user will recieve a confirmation of their purchase along with their total purchase price.  They will again be prompted to either "View items for sale" or to "Leave the store".

![4](images/4.jpg)

5) If there is not enough inventory to fill the order, the user will be advised of this along with the available quantity.  They will then be prompted to either "View items for sale" or to "Leave the store"

![5](images/5.jpg)
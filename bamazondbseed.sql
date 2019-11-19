-- drop db if exists, create db --
DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

-- use bamazon db --
USE bamazon_db;

-- create products table --
CREATE TABLE products (
	item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  product_sales DECIMAL(10,2) DEFAULT 0,
	PRIMARY KEY (item_id)
);

 
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES 
("Bose Noise Cancellng Headphones", "Electronics", 349.99, 10, 3500), 
("Monster Energy Zero Ultra", "Food", 1.99, 100, 2400), 
("Raspberry Pi 3", "Electronics", 34.99, 4, 3000), 
("Lego Classic Brick Set, 1500 Piece, Multicolor", "Toys", 46.99, 20, 1800), 
("Blanket", "Household", 19.99, 50, 4000), 
("Shirt", "Clothes", 9.99, 500, 9999), 
("Le Creuset Dutch Oven", "Kitchen", 349.99, 15, 1500), 
("Tennis Balls (3)", "Sports Equipment", 3.99, 100, 800), 
("Pillow", "Household", 9.99, 50, 8000), 
("Nikon F3", "Electronics", 332.99, 1, 0);

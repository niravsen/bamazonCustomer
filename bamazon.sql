 DROP DATABASE if exists bamazon_db;
 
 CREATE DATABASE bamazon_db;
 
 USE bamazon_db;
 
 CREATE TABLE products(
 
 item_id INT NOT NULL AUTO_INCREMENT,
 product_name VARCHAR(100),
 department_name VARCHAR(100),
 price DECIMAL (8,2) NULL,
 stock_quantity INTEGER NOT NULL,
 Primary Key (item_id)
 );

INSERT INTO products (Product_Name, Department_Name, Price, Stock_Quantity) VALUES ("Camera", "Electronics", "249.99", "50"),
 ("Vitamin C serum", "Skin Care", "18.99", "130"), ("Settlers of Catan", "Toys & Games", "54.59", "210"), ("Keurig coffee maker", "Appliances", "147.99", "110"),
 ("Keyboard", "Electronics", "525.00", "65"), ("Bicycle", "Sports & Outdoors", "199.99", "45"), ("Yoga mat", "Sports & Outdoors", "15.99", "76"), 
("Meaty", "Books & Audio", "24.99", "220"),  ("Febreeze air freshner", "Health & Personal Care", "19.99", "300"),  ("Backpack", "Sports & Outdoor", "34.99", "155");

select * from products;
 
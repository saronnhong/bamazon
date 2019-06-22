DROP DATABASE IF EXISTS bmazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
 item_id INT NOT NULL AUTO_INCREMENT,
 product_name VARCHAR(45) NOT NULL,
 department_name VARCHAR(45),
 price INT,
 stock_quantity INT,
 PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Hario Electric Kettle", "Kitchen", 120, 15);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Nintendo Switch", "Electronics", 300, 25);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Bose Headphones", "Electronics", 350, 10);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Macbook Air", "Electronics", 1100, 5);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Harry Potter Books", "Books", 20, 50);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Game Of Thrones Books", "Books", 20, 60);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Chromecast", "Electronics", 50, 100);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Kitchen Scale", "Kitchen", 10, 75);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Bamazon Kindle", "Electronics", 100, 100);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Instant Thermometer", "Kitchen", 5, 50);

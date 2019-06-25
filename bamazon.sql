DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
 item_id INT NOT NULL AUTO_INCREMENT,
 product_name VARCHAR(45) NOT NULL,
 department_name VARCHAR(45),
 price INT,
 stock_quantity INT,
 product_sales INT default 0,
 PRIMARY KEY (item_id)
);

SELECT * FROM products;
SELECT item_id, product_name, price, stock_quantity, product_sales FROM products WHERE stock_quantity < 5;

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Hario Electric Kettle", "Kitchen", 120, 4);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Nintendo Switch", "Electronics", 300, 3);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Bose Headphones", "Electronics", 350, 10);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Macbook Air", "Electronics", 1100, 5);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Harry Potter Books", "Books", 20, 50);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Game Of Thrones Books", "Books", 20, 60);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Chromecast", "Electronics", 50, 100);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Kitchen Scale", "Kitchen", 10, 75);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Bamazon Kindle", "Electronics", 100, 100);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Instant Thermometer", "Kitchen", 5, 50);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Rolex Explorer Watch", "Watch", 9000, 1);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Michael Jordan Rookie Card", "Collectibles", 50000, 1);



CREATE TABLE department (
 department_id INT NOT NULL AUTO_INCREMENT,
 department_name VARCHAR(45) NOT NULL,
 over_head_costs INT,
 product_sales INT default 0,
 total_profits INT,
 PRIMARY KEY (department_id)
);

SELECT department_id AS ID, department_name AS Department, over_head_costs AS "Over Head Costs ($)", product_sales AS "Product Sales ($)", total_profits AS "Total Profits ($)" FROM department;

INSERT INTO department(department_name, over_head_costs) VALUES("Electronics", 100);
INSERT INTO department(department_name, over_head_costs) VALUES("Kitchen", 50);
INSERT INTO department(department_name, over_head_costs) VALUES("Books", 50);
INSERT INTO department(department_name, over_head_costs) VALUES("Watch", 50);
INSERT INTO department(department_name, over_head_costs) VALUES("Collectibles", 50);

-- for each department
SELECT SUM(products.product_sales)
FROM products
WHERE department_name = "Electronics";

SELECT * FROM department;

DROP TABLE department;

SELECT department.department_id, department.department_name, department.over_head_costs, products.product_sales
FROM department
LEFT JOIN products ON products.department_name = department.department_name;

SELECT products.department_name, SUM(products.product_sales) AS "Product Sales"
FROM products
GROUP BY products.department_name;

SELECT products.department_name, SUM(products.product_sales) AS "Product Sales"
FROM department
LEFT JOIN products ON products.department_name = department.department_name
GROUP BY products.department_name;
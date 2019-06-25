DROP DATABASE IF EXISTS departmentDB;

CREATE DATABASE departmentDB;

USE departmentDB;

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
CREATE DATABASE company_db;

use company_db;


-- create table employees(
--     employee_id int primary key,
--     name varchar(50),
--     department_id int
-- )

-- CREATE TABLE departments (
--     department_id INT PRIMARY KEY,
--     department_name VARCHAR(50)
-- );

-- INSERT INTO employees (employee_id, name, department_id) VALUES
-- (1,  'Alice',     1),   -- HR
-- (2,  'Bob',       2),   -- IT
-- (3,  'Charlie',   3),   -- Finance
-- (4,  'David',     NULL),-- No department
-- (5,  'Eve',       1),   -- HR
-- (6,  'Frank',     2),   -- IT
-- (7,  'Grace',     4),   -- Marketing
-- (8,  'Hannah',    2),   -- IT
-- (9,  'Ian',       3),   -- Finance
-- (10, 'Jack',      NULL),-- No department
-- (11, 'Karen',     1),   -- HR
-- (12, 'Leo',       4),   -- Marketing
-- (13, 'Mia',       NULL),-- No department
-- (14, 'Nina',      3),   -- Finance
-- (15, 'Oscar',     2);   -- IT

-- INSERT INTO departments VALUES
-- (1, 'HR'),
-- (2, 'IT'),
-- (3, 'Finance'),
-- (4, 'Marketing');


-- -- * Inner Join

-- select e.name , d.department_name

-- from employees e

-- inner join departments d

-- on e.department_id = d.department_id


-- ---* Left join

-- select e.name , d.department_name

-- from employees e

-- left join departments d

-- on e.department_id = d.department_id

-- --*right join

-- select e.name , d.department_name

-- from employees e

-- right join departments d

-- on e.department_id = d.department_id



-- select * from employees

-- select e1.name as employee1 , e2.name as employee2 , d.department_name

-- from employees e1

-- JOIN employees e2 on e1.department_id = e2.department_id and e1.employee_id <> e2.employee_id

-- JOIN departments d on e1.department_id = d.department_id


-- select name as entity from employees
-- UNION
-- select department_name from departments

-- --*
-- SELECT name, department_id
-- FROM employees
-- WHERE department_id = 1
-- UNION ALL
-- SELECT department_name, department_id
-- FROM departments
-- WHERE department_id != 1;


-- select name

-- from employees

-- where department_id = (
--     select department_id
--     from employees
--     where name = "Alice"
-- )

-- DELIMITER $$

-- create Procedure procedure_name(params)

-- BEGIN
--  --sql;
-- END $$



DELIMITER $$

create PROCEDURE GetAllEmployees()

BEGIN
    select * from employees;
END $$

DELIMITER ;

CALL GetAllEmployees();


DELIMITER $$

create PROCEDURE GetEmployeesByDept(
    IN deptId INT
)

BEGIN
SELECT name
    FROM employees
    WHERE department_id = deptId;
END $$    

DELIMITER ;

CALL GetEmployeesByDept(1);

DELIMITER $$

CREATE PROCEDURE CountEmployeesByDept(
    IN deptId INT,
    OUT empCount INT
)
BEGIN
    SELECT COUNT(*) INTO empCount
    FROM employees
    WHERE department_id = deptId;
END $$

DELIMITER ;

CALL CountEmployeesByDept(1, @suraj);
SELECT @suraj; -- Shows the output
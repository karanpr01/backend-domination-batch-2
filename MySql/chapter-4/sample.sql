create database company_db;

use company_db;

-- CREATE TABLE employees (
--     employee_id INT PRIMARY KEY,
--     name VARCHAR(50),
--     department_id INT
-- );

-- CREATE TABLE departments (
--     department_id INT PRIMARY KEY,
--     department_name VARCHAR(50)
-- );

-- INSERT INTO
--     employees
-- VALUES (1, 'Alice', 1),
--     (2, 'Bob', 2),
--     (3, 'Charlie', 3),
--     (4, 'David', NULL);

-- INSERT INTO
--     departments
-- VALUES (1, 'HR'),
--     (2, 'IT'),
--     (3, 'Finance'),
--     (4, 'Marketing');

-- -- *Inner Join*

-- select e.name, d.department_name
-- from employees e
--     INNER JOIN departments d on e.department_id = d.department_id;

-- -- *Left Join*

-- select e.name, d.department_name
-- from employees e
--     LEFT JOIN departments d on e.department_id = d.department_id;

-- -- *Right Join*

-- select e.name, d.department_name
-- from employees e
--     RIGHT JOIN departments d on e.department_id = d.department_id;



-- -- * self join *




-- SELECT e1.name AS employee1, e2.name AS employee2, d.department_name

-- FROM employees e1

-- JOIN employees e2 ON e1.department_id = e2.department_id AND e1.employee_id <> e2.employee_id

-- JOIN departments d ON e1.department_id = d.department_id;

-- SELECT name AS entity FROM employees
-- UNION
-- SELECT department_name FROM departments;

-- -- -- *UnionALL*

-- SELECT name AS entity FROM employees
-- UNION ALL
-- SELECT department_name FROM departments;

-- SELECT name, department_id
-- FROM employees
-- WHERE department_id = 1
-- UNION
-- SELECT department_name, department_id
-- FROM departments
-- WHERE department_id != 1;


SELECT name
FROM employees
WHERE department_id = (
    SELECT department_id
    FROM employees
    WHERE name = 'Alice'
);

SELECT name
FROM employees
WHERE department_id IN (
    SELECT department_id
    FROM departments
    WHERE department_name IN ('IT', 'Finance')
);

SELECT employee_id, name
FROM employees
WHERE (name, department_id) = (
    SELECT name, department_id
    FROM employees
    WHERE name = 'Bob'
);
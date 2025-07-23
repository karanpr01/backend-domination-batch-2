# **Joins in MySQL**

## **Database Setup**

We’ll use a database called `company_db` with two tables:

### **1. employees**

| employee\_id | name    | department\_id |
| ------------ | ------- | -------------- |
| 1            | Alice   | 1              |
| 2            | Bob     | 2              |
| 3            | Charlie | 3              |
| 4            | David   | NULL           |

### **2. departments**

| department\_id | department\_name |
| -------------- | ---------------- |
| 1              | HR               |
| 2              | IT               |
| 3              | Finance          |
| 4              | Marketing        |

---

### **SQL to Create and Insert Data**

```sql
CREATE DATABASE company_db;
USE company_db;

CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(50),
    department_id INT
);

CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(50)
);

INSERT INTO employees (employee_id, name, department_id) VALUES
(1,  'Alice',     1),   -- HR
(2,  'Bob',       2),   -- IT
(3,  'Charlie',   3),   -- Finance
(4,  'David',     NULL),-- No department
(5,  'Eve',       1),   -- HR
(6,  'Frank',     2),   -- IT
(7,  'Grace',     4),   -- Marketing
(8,  'Hannah',    2),   -- IT
(9,  'Ian',       3),   -- Finance
(10, 'Jack',      NULL),-- No department
(11, 'Karen',     1),   -- HR
(12, 'Leo',       4),   -- Marketing
(13, 'Mia',       NULL),-- No department
(14, 'Nina',      3),   -- Finance
(15, 'Oscar',     2);   -- IT

INSERT INTO departments VALUES
(1, 'HR'),
(2, 'IT'),
(3, 'Finance'),
(4, 'Marketing');
```

---

## **Types of Joins in MySQL**

Joins are used to combine rows from two or more tables based on a related column.
In our example, the relationship is **`employees.department_id` ↔ `departments.department_id`**.

---

### **1. INNER JOIN**

* Returns only rows where there is a match in both tables.
* Excludes employees without a department.

```sql
SELECT e.name, d.department_name
FROM employees e
INNER JOIN departments d
ON e.department_id = d.department_id;
```

**Result:**

| name    | department\_name |
| ------- | ---------------- |
| Alice   | HR               |
| Bob     | IT               |
| Charlie | Finance          |

David is excluded because he has no department.

---

### **2. LEFT JOIN (LEFT OUTER JOIN)**

* Returns **all rows from the left table (`employees`)**, even if there is no match in `departments`.
* Missing matches show `NULL`.

```sql
SELECT e.name, d.department_name
FROM employees e
LEFT JOIN departments d
ON e.department_id = d.department_id;
```

**Result:**

| name    | department\_name |
| ------- | ---------------- |
| Alice   | HR               |
| Bob     | IT               |
| Charlie | Finance          |
| David   | NULL             |

David is included, but department is `NULL`.

---

### **3. RIGHT JOIN (RIGHT OUTER JOIN)**

* Returns **all rows from the right table (`departments`)**, even if there is no match in `employees`.
* Missing employees show `NULL`.

```sql
SELECT e.name, d.department_name
FROM employees e
RIGHT JOIN departments d
ON e.department_id = d.department_id;
```

**Result:**

| name    | department\_name |
| ------- | ---------------- |
| Alice   | HR               |
| Bob     | IT               |
| Charlie | Finance          |
| NULL    | Marketing        |

Marketing is included even though no one works there.

---


### **4 SELF JOIN (Bonus)**

* Join a table with itself.
* Example: Find employees in the same department.

```sql
SELECT e1.name AS employee1, e2.name AS employee2, d.department_name
FROM employees e1
JOIN employees e2 ON e1.department_id = e2.department_id AND e1.employee_id < e2.employee_id
JOIN departments d ON e1.department_id = d.department_id;
```

**Result:**
(With given data, no two employees share the same department, so this returns empty. But if there were two in HR, it would pair them.)

---

## **Quick Summary Table**

| Join Type       | What It Returns                                      |
| --------------- | ---------------------------------------------------- |
| INNER JOIN      | Only matching rows in both tables                    |
| LEFT JOIN       | All from left table + matching rows from right table |
| RIGHT JOIN      | All from right table + matching rows from left table |
| SELF JOIN       | Table joined with itself                             |



## **What is a Stored Procedure?**

A **Stored Procedure** is a **set of SQL statements** saved in the database that you can call (execute) whenever needed.

### Why use Stored Procedures?

* To **reuse queries** without rewriting them.
* To **encapsulate business logic** (like inserting, updating, reports).
* To **improve performance** (precompiled and cached).
* To **make code modular** (similar to functions in programming).

---

## **Basic Syntax**

```sql
DELIMITER $$

CREATE PROCEDURE procedure_name (parameters)
BEGIN
    -- SQL statements
END $$

DELIMITER ;
```

### Why `DELIMITER`?

MySQL uses `;` to end statements.
Since the procedure itself may contain `;`, we temporarily change the delimiter (e.g., `$$`), so MySQL knows where the procedure ends.

---

## **Example Database Recap**

We have:

### **employees**

| employee\_id | name    | department\_id |
| ------------ | ------- | -------------- |
| 1            | Alice   | 1              |
| 2            | Bob     | 2              |
| 3            | Charlie | 3              |
| 4            | David   | NULL           |

### **departments**

| department\_id | department\_name |
| -------------- | ---------------- |
| 1              | HR               |
| 2              | IT               |
| 3              | Finance          |
| 4              | Marketing        |

---

## **1. Creating a Simple Stored Procedure**

Example: Get **all employees**.

```sql
DELIMITER $$

CREATE PROCEDURE GetAllEmployees()
BEGIN
    SELECT * FROM employees;
END $$

DELIMITER ;
```

### **Call it**

```sql
CALL GetAllEmployees();
```

---

## **2. Stored Procedure with Input Parameter**

Example: Get **employees by department ID**.

```sql
DELIMITER $$

CREATE PROCEDURE GetEmployeesByDept(IN deptId INT)
BEGIN
    SELECT name
    FROM employees
    WHERE department_id = deptId;
END $$

DELIMITER ;
```

### **Call it**

```sql
CALL GetEmployeesByDept(2);
```

Returns all employees in department 2 (IT).

---

## **3. Stored Procedure with Output Parameter**

Example: Get **number of employees** in a department.

```sql
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
```

### **Call it**

```sql
CALL CountEmployeesByDept(1, @total);
SELECT @total; -- Shows the output
```

---

## **4. Stored Procedure with Multiple SQL Statements**

Example: Add a new employee **only if the department exists**.

```sql
DELIMITER $$

CREATE PROCEDURE AddEmployee(
    IN empName VARCHAR(50),
    IN deptId INT
)
BEGIN
    -- Check if department exists
    IF EXISTS (SELECT 1 FROM departments WHERE department_id = deptId) THEN
        INSERT INTO employees (name, department_id)
        VALUES (empName, deptId);
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Department does not exist';
    END IF;
END $$

DELIMITER ;
```

### **Call it**

```sql
CALL AddEmployee('Eve', 2); -- Inserts into IT
CALL AddEmployee('Mark', 99); -- Throws error
```

---

## **5. Modifying or Dropping a Stored Procedure**

### **Drop**

```sql
DROP PROCEDURE IF EXISTS GetAllEmployees;
```

---

## **Key Points**

1. Stored Procedures **must be created once** and can be reused by `CALL`.
2. Use `IN`, `OUT`, or `INOUT` parameters:

   * `IN`: Pass a value.
   * `OUT`: Return a value.
   * `INOUT`: Both pass and return.
3. Use `DELIMITER` to handle multiple SQL statements.
4. Can include **control structures** like `IF`, `LOOP`, `WHILE`.

---

## **Quick Summary Table**

| Feature                     | Example                      |
| --------------------------- | ---------------------------- |
| Create Procedure            | `CREATE PROCEDURE name(...)` |
| Call Procedure              | `CALL name(args);`           |
| Input Parameter             | `IN deptId INT`              |
| Output Parameter            | `OUT empCount INT`           |
| Drop Procedure              | `DROP PROCEDURE name;`       |
| Supports Control Structures | `IF`, `LOOP`, `WHILE`        |


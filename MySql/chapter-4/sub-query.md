

## **What is a Subquery?**

A **subquery** (also called an *inner query* or *nested query*) is a query **inside another SQL query**.
It is enclosed in parentheses `( )` and is used to:

* Filter results
* Compare values
* Return data for the main query (outer query)

The **outer query** uses the subquery’s result.

---

## **Types of Subqueries**

### 1. **Single-row Subquery**

* Returns **only one value** (one row, one column).
* Used with operators like `=`, `<`, `>`, etc.

Example: Find **employees who work in the same department as 'Alice'**.

```sql
SELECT name
FROM employees
WHERE department_id = (
    SELECT department_id
    FROM employees
    WHERE name = 'Alice'
);
```

**How it works:**

* The inner query finds Alice’s `department_id`.
* The outer query gets all employees in that department.

---

### 2. **Multi-row Subquery**

* Returns **multiple rows (single column)**.
* Used with operators like `IN`, `ANY`, `ALL`.

Example: Find **employees in IT or Finance departments**.

```sql
SELECT name
FROM employees
WHERE department_id IN (
    SELECT department_id
    FROM departments
    WHERE department_name IN ('IT', 'Finance')
);
```

**How it works:**

* Subquery gets `department_id` for IT and Finance.
* Outer query fetches employees from those departments.

---

### 3. **Multi-column Subquery**

* Returns **multiple columns**.
* Typically used with comparisons in tuples.

Example: Find **employee(s) who match both name and department\_id of Bob** (just for illustration):

```sql
SELECT employee_id, name
FROM employees
WHERE (name, department_id) = (
    SELECT name, department_id
    FROM employees
    WHERE name = 'Bob'
);
```

---

### 4. **Correlated Subquery**

* A subquery that **depends on the outer query** (runs for each row of the outer query).
* Slower but powerful.

Example: Find **employees who belong to departments with more than 1 employee**.

```sql
SELECT name
FROM employees e
WHERE (
    SELECT COUNT(*)
    FROM employees
    WHERE department_id = e.department_id
) > 1;
```

**How it works:**

* For each employee in `employees e`, the subquery counts how many employees share their department.
* Only those with more than 1 remain.

---

### 5. **Subquery in SELECT (Scalar Subquery)**

* Subquery returns a **single value** which is displayed as a column.

Example: Show each employee’s name and **total employees in their department**.

```sql
SELECT name,
(
    SELECT COUNT(*)
    FROM employees
    WHERE department_id = e.department_id
) AS department_count
FROM employees e;
```

---

### 6. **Subquery in FROM (Derived Table)**

* Subquery is treated like a **temporary table**.

Example: Find **departments with employee counts** and only show those with 1 or more employees.

```sql
SELECT department_id, total_employees
FROM (
    SELECT department_id, COUNT(*) AS total_employees
    FROM employees
    GROUP BY department_id
) AS dept_summary
WHERE total_employees >= 1;
```

---

## **Key Points**

1. Subqueries must be enclosed in `( )`.
2. The inner query is executed **before** the outer query (except correlated ones).
3. Can be used in `SELECT`, `FROM`, `WHERE`, or `HAVING`.
4. Avoid subqueries when a `JOIN` can be used — joins are often faster.

---

## **Quick Summary Table**

| Subquery Type            | Returns                      | Used With               |
| ------------------------ | ---------------------------- | ----------------------- |
| Single-row Subquery      | One row, one column          | `=`, `<`, `>`           |
| Multi-row Subquery       | Multiple rows, one column    | `IN`, `ANY`, `ALL`      |
| Multi-column Subquery    | Multiple rows, multiple cols | Tuples (`(col1, col2)`) |
| Correlated Subquery      | Varies per outer query row   | `WHERE`, `HAVING`       |
| Scalar Subquery (SELECT) | Single value per row         | As a column in `SELECT` |
| Derived Table (FROM)     | Temporary table              | Used in `FROM` clause   |


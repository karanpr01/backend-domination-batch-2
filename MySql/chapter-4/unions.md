## **What is UNION in MySQL?**

`UNION` is used to **combine the results of two or more SELECT queries into a single result set.**

* By default, `UNION` **removes duplicate rows** (it returns only unique rows).
* Each `SELECT` must have the **same number of columns**, and the **corresponding columns must have compatible data types**.

---

## **What is UNION ALL?**

* `UNION ALL` also combines multiple result sets.
* But it **does not remove duplicates** — all rows from both queries are returned.

---

## **Syntax**

```sql
SELECT column1, column2 FROM table1
UNION [ALL]
SELECT column1, column2 FROM table2;
```

---

## **Example Database Recap**

We already have:

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

## **1. Using UNION (removes duplicates)**

Suppose we want to list **all names (employees and departments)** in one column.

```sql
SELECT name AS entity FROM employees
UNION
SELECT department_name FROM departments;
```

**Result (Duplicates Removed):**

| entity    |
| --------- |
| Alice     |
| Bob       |
| Charlie   |
| David     |
| HR        |
| IT        |
| Finance   |
| Marketing |

Even if an employee name matched a department name, duplicates would be **removed**.

---

## **2. Using UNION ALL (keeps duplicates)**

Same query but **keeps duplicates**:

```sql
SELECT name AS entity FROM employees
UNION ALL
SELECT department_name FROM departments;
```

**Result (Duplicates Kept):**

| entity    |
| --------- |
| Alice     |
| Bob       |
| Charlie   |
| David     |
| HR        |
| IT        |
| Finance   |
| Marketing |

Currently no duplicates, but if an employee were named "HR", it would appear **twice**.

---

## **3. Combining Filters with UNION**

List **employees in department 1 (HR)** and **all departments except HR** together:

```sql
SELECT name, department_id
FROM employees
WHERE department_id = 1
UNION
SELECT department_name, department_id
FROM departments
WHERE department_id != 1;
```

* Here we combined columns with different content (employee names + department names).
* Both columns need to have the **same number and data type** (the first column is `VARCHAR` for both queries).

---

## **Key Differences: UNION vs UNION ALL**

| Feature     | UNION                         | UNION ALL                   |
| ----------- | ----------------------------- | --------------------------- |
| Duplicates  | Removes duplicates            | Keeps duplicates            |
| Performance | Slower (extra work to remove) | Faster (no duplicate check) |
| Use Case    | When you want unique results  | When you want everything    |

---

## **When to Use Which?**

* Use **`UNION`** when you want a **distinct list** (like merging customer lists from two branches).
* Use **`UNION ALL`** when:

  * Duplicates **matter** (e.g., counting total entries).
  * You need **better performance**.


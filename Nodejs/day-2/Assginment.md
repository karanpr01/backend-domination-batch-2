
# Backend Assingment Questions and Answers

---

## 1. **How is a Promise executed in the Event Loop in Node.js?**

> **Promises do their job silently in the background** like a secret agent 🕵️.  
> Once the **Call Stack gets clear**, the **Microtask Queue** steps in and **executes the Promise callbacks**.  
> This always happens **after the synchronous code**, but **before any timer functions** like `setTimeout`.



---

## 2. **Difference between `setTimeout` and `setImmediate`**

> **`setTimeout` waits and checks its watch**, even for 0ms.  
> **`setImmediate` runs immediately after the current script or I/O event ends**.  
> Outside of I/O, the order is **not guaranteed** — depends on Node.js internals and system timing.



---

## 3. **Is `req` or `res` an Object or Array in Node.js?**

> ✅ Both `req` and `res` are **Objects**, not Arrays.  
> They are special objects from Node.js `http` module — containers for handling client requests and server responses.

---

## 4. **Difference between IP, Port, and Domain**

> **Domain is what we type, IP is where it goes, and Port is who answers the door.**

- **IP Address** is the GPS location of a server.
- **Port** is the room number (e.g. `:80`, `:443`, `:3000`)
- **Domain** is the nickname we use instead of numbers (e.g. `google.com`)

### 🧪 Example Flow:
1. You search `google.com` → Domain  
2. DNS finds its IP address like `142.250.195.14` → IP  
3. Since it's HTTPS, it uses port `443` → Port

> 🧠 One-liner: **Domain is the name, IP is the address, Port is the door.**

---



## 🧠 What is Object Mode in Streams?

By default, **Node.js streams** work with **Buffer** or **string** data — especially useful for files, network streams, etc.

But when you want to **stream JavaScript objects**, you need to enable **Object Mode**.

---

### ✅ Why Do We Need Object Mode?

* Regular streams treat all data as binary (Buffer) or strings.
* If you try to push a JavaScript object (`{name: 'Alice'}`), it will throw an error.
* With **objectMode: true**, streams can handle **non-buffer, non-string data** — like full objects, arrays, numbers, etc.

---

## 🧪 Example Without Object Mode

```js
const { Readable } = require('stream');

const myStream = new Readable();

myStream._read = () => {};

myStream.push({ name: 'Alice' }); // ❌ Throws an error: Invalid non-string/buffer chunk
```

This will **crash** because streams by default expect **Buffer** or **string** chunks.

---

## ✅ Enabling Object Mode

```js
const { Readable } = require('stream');

const myObjStream = new Readable({
  objectMode: true // 🔑 Enabling object mode
});

myObjStream._read = () => {};

myObjStream.push({ name: 'Alice' });
myObjStream.push({ name: 'Bob' });
myObjStream.push(null); // end the stream

myObjStream.on('data', (chunk) => {
  console.log('Received:', chunk);
});
```

🟢 Output:

```
Received: { name: 'Alice' }
Received: { name: 'Bob' }
```

---

## 📦 Object Mode in Other Stream Types

* **Readable Streams** – For reading objects (like rows from DB, lines, or JSON).
* **Writable Streams** – To write objects (e.g., send logs or write to a DB).
* **Transform Streams** – Transform objects from input to output (like modifying JSON records).

### Example: Object Mode Transform Stream

```js
const { Transform } = require('stream');

const toUpperCase = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    chunk.name = chunk.name.toUpperCase();
    callback(null, chunk);
  }
});

toUpperCase.on('data', (data) => console.log(data));

toUpperCase.write({ name: 'alice' }); // ➜ { name: 'ALICE' }
toUpperCase.write({ name: 'bob' });   // ➜ { name: 'BOB' }
```

---

## 🛠 Use Cases for Object Mode

* Streaming data from a **database** (e.g., MongoDB rows)
* **JSON API** response processing
* Logging systems
* Processing **IoT sensor data**
* Pipelines for data processing (ETL)

---



import express from "express";

const app = express();

// parse JSON bodies
app.use(express.json());


const data = [
  { id: 1, name: "Prem Karn",  email: "prem@gmail.com" },
  { id: 2, name: "Priya Karn", email: "priya@gmail.com" }
];



// API EndPoints
app.get("/", (req, res) => {
  console.log("Request is coming...");
  res.status(200).send("Hello World");
});



// Return all users
app.get("/users", (req, res) => {
  res.status(200).json(data);
});



// Route param: get single user by id
app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const user = data.find(u => u.id === Number(id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.status(200).json(user);
});



// Query param: get user by name ?name=...
app.get("/user", (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ error: "Query param `name` required" });
  const user = data.find(u => u.name === name);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.status(200).json(user);
});



// CREATE user (POST /users) - more RESTful
app.post("/createUser", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "name and email are required" });

  const newUser = {
    id: data.length ? Math.max(...data.map(u => u.id)) + 1 : 1,
    name,
    email
  };

  data.push(newUser);
  res.status(201).json({ success: true, message: "User Created Successfully", user: newUser });
});



// UPDATE user (PUT /user/:id)
app.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const idx = data.findIndex(u => u.id === Number(id));
  if (idx === -1) return res.status(404).json({ error: "User not found" });

  // simple partial update
  if (name) data[idx].name = name;
  if (email) data[idx].email = email;

  res.status(200).json({ success: true, message: "User Updated Successfully", user: data[idx] });
});

// (Optional) DELETE user
app.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  const idx = data.findIndex(u => u.id === Number(id));
  if (idx === -1) return res.status(404).json({ error: "User not found" });
  const removed = data.splice(idx, 1)[0];
  res.status(200).json({ success: true, message: "User deleted", user: removed });
});


// PATCH -> partial update
app.patch("/user/:id", (req, res) => {
    const { id } = req.params;
    const updates = req.body;   // whatever fields the client sends

    const idx = data.findIndex(u => u.id === Number(id));
    if (idx === -1) return res.status(404).json({ error: "User not found" });

    // update only the fields provided
    Object.assign(data[idx], updates);

    res.status(200).json({
        success: true,
        message: "User Partially Updated Successfully",
        user: data[idx]
    });
});




app.listen(3000, () => {
  console.log("Server is Running ✅ on port 3000");
});

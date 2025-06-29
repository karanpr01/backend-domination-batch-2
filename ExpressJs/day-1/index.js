import express from "express";

const app = express();

app.use(express.json());

const data = [
  {
    id: 1,
    name: "Suraj",
    email: "suraj@example.com",
  },
  {
    id: 2,
    name: "Karan",
    email: "Karan@example.com",
  },
  {
    id: 3,
    name: "Akash",
    email: "Akash@example.com",
  },
];

app.get("/get-users", (req, res) => {
  res.status(200).json(data);
});

// Routes Params
app.get("/get-user/:id", (req, res) => {
    const {id} = req.params;
    const user = data.find((user) => user.id === Number(id));
    res.status(200).json(user);
})


// Query Params 
app.get("/get-user" , (req , res)=>{
const {name , age} = req.query;

res.status(200).json({name , age})
})


// *POST

app.post("/create-user" , (req , res)=>{
    const {name , email} = req.body;

    data.push({
        id:data.length + 1,
        name,
        email
    })

    res.status(201).json(
        {
            success:true,
            message:"User created successfully",
            data
        }
    )
})


app.listen(8000, () => {
  console.log("Hello world server is running on port number 8000✅");
});

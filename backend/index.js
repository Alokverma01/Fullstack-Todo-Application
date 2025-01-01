const  express = require("express");
const cors = require("cors");    // for cors error -> when you want to get data from backend on {localhost:<port>/domain} 
                                // then you cannot get data directly browser trying to protect it by (cors policy). because of this how can you get the data from backend do { in termial type npm install cors} and then require it in index.js file and use this syntax { app.use(cors())} if you want to restrict in who can use it then type {app.use(cors({ origin: "localhost:5173"}))} which will be your frontend url
const {CreateTodo, UpdateTodo} = require("./test");
const { todo } = require("./db");
const app = express();
const PORT = 1000;

app.use(express.json());
app.use(cors())

app.get("/todos" , async (req,  res) =>{
    // const todos = await todo.find({});
    res.json({
        todos: []   
    })
    
})
app.post("/todo" , async (req,  res) => {
    const createPayload = req.body;
    const parsePayload =  CreateTodo.safeParse(createPayload);
    if(!parsePayload.success){
        res.status(411).json({
            msg : "you sent the wrong inputs",
        })
         return;
    }
      // put it in Mongodb
    await todo.create({
        title : createPayload.title,
        description : createPayload.description,
        completed : false
    })
        res.json({
            msg : "Todo Created" , 
        })
})
app.put("/completed", async (req , res) =>{
    const updatePayload =  req.body;
    const parsePayload = UpdateTodo.safeParse(updatePayload);
    if(!parsePayload.success){
        res.status(411).json({
            msg: "You inputted wrong id"
        })
        return;
    }
    // update in mongodb
    await todo.update({
        _id : req.body.id
    }, {
        completed : true
    })
    res.json({
        msg : "Todo marked as completetd"
    })
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
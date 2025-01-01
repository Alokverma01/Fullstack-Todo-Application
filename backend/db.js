const mongoose = require("mongoose");

const uri = "mongodb+srv://admin:alok75100@cluster0.nf1ic.mongodb.net/todos";

mongoose.connect(uri);
const todoSchema = mongoose.Schema({
    title : String,
    description : String,
    completed : Boolean,
})

const todo = mongoose.model("todo" , todoSchema);
module.exports = {
    todo
}
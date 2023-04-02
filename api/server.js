const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const app = express();

app.use(express.json());
app.use(cors());

// connect to mongoose
mongoose.connect(`mongodb+srv://Bridgy:${process.env.MONGO_KEY}@blogcluster.qkqd4gp.mongodb.net/merntodo?retryWrites=true&w=majority`, {
    // test whether I need these later on
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('connected to DB'))
    .catch(console.error);

// mongoose models
const Todo = require('./models/todo');

// if we make a req here it will find out todos (using our model) then pass them back using the res.json
app.get('/todos', async (req, res) => {
    try{

        const todos = await Todo.find();
        res.json(todos);

    } catch (err) {
        console.log(err.message);
    }
});

// post req to our DB
app.post('/todos/new', (req, res) => {
    try {
        const todo = new Todo({
            text: req.body.text
        });
        todo.save();
        res.json(todo);
    } catch (err) {
        console.log(err.message);
    }
    
});

// delete todo
app.delete('/todos/delete/:id', async (req, res) => {
    try{
        const result = await Todo.findByIdAndDelete(req.params.id);
        res.json(result);
    }catch (err) {
        console.log(err.message);
    }  
});

// mark todo as complete
app.put('/todos/complete/:id', async (req, res) => {
    try{
        const result = await Todo.findById(req.params.id);
        result.complete = !result.complete
        result.save()
        res.json(result);
    }catch (err) {
        console.log(err.message)
    }
})

app.listen(3001, () => {
    console.log('app now listening on port 3001')
})
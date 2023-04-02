const mongoose = require('mongoose');

// schema is the blueprint for the data, whereas the model is the interface for CRUD
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: String,
        default: Date.now()
    }
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
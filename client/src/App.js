import { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:3001';

function App() {
    const [todos, setTodos] = useState([])
    const [popupActive, setPopupActive] = useState(false)
    const [newTodo, setNewTodo] = useState('')

    // inital fetching of the todos
    useEffect(() => {
        getTodos()
        console.log(todos)
    }, [])

    // fetch todo func
    const getTodos = () => {
        fetch(API_BASE + '/todos')
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.log("err: ", err.message))
    }

    // checks off the todo
    const handleCheck = async (id) => {
        const data = await fetch(API_BASE + '/todos/complete/' + id, { method: "PUT"} )
        .then(res => res.json())
        .catch(err => console.log(err.message))
        
        setTodos(todos => todos.map(todo => {
            if(todo._id === data._id){
                todo.complete = data.complete
            }

            return todo;
        }))
    }

    // deletes the todo
    const handleDelete = async (id) => {
        const data = await fetch(API_BASE + '/todos/delete/' + id, { method: "DELETE"} )
        .then(res => res.json())
        .catch(err => console.log(err.message))

        setTodos(todos => todos.filter(todo => {
            return todo._id !== data._id
        }))
    }

    // adds a todo
    const handleAddTodo = async () => {
        const data = await fetch(API_BASE + '/todos/new', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: newTodo
            })
        }).then(res => res.json());

        setTodos([...todos, data])
        setPopupActive(false)
        setNewTodo('')
        console.log(data)
    }


	return (
		<div className="App">
            <h1>Welcome, René</h1>
            <h4>Your Tasks</h4>

            <div className="todos">
                
                {todos.map(todo => (
                    <div className={todo.complete ? "todo is-complete" : "todo"} key={todo._id}>
                        <div className="checkbox" onClick={() => handleCheck(todo._id)}></div>
                        <div className="text">{todo.text}</div>
                        <div className="delete-todo" onClick={() => handleDelete(todo._id)}>x</div>
                    </div>
                ))}

            </div>

            {popupActive && (
                <div className='popup'>
                    <div className='closePopup' onClick={() => setPopupActive(false)}>x</div>
                    <div className="content">
                        <h3>Add Task</h3>
                        <input 
                            type="text" 
                            className='add-todo-input' 
                            onChange={(e) => setNewTodo(e.target.value)}
                            value={newTodo}
                        />
                        <div className="button" onClick={handleAddTodo}>Create Task</div>
                    </div>
                </div>

            )}

            <div className='addPopup' onClick={(() => setPopupActive(true))}>+</div>
		</div>
	);
}

export default App;

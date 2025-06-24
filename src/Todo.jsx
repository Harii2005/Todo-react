import { useState } from "react";
import { v4 as uuidv4 } from 'uuid'; //this will generate a unique key for every task 
import './Todo.css'; // Import the new CSS file

export default function Todo(){

    let[todos , setTodos] = useState([{task : "sample task" , id : uuidv4() , isDone: false }]);
    let[newTodo , setNewTodo] = useState("");

    let addNewTask = (()=>{ //use call backs if NEWvalue depends of OLDvalue
        setTodos((prevTodos)=>(
            [...prevTodos, { task: newTodo, id: uuidv4()  , isDone : false}]
        )); 
        setNewTodo("");
    })

    let updateTodoValue = ((event)=>{
        setNewTodo(event.target.value);
    });

    let deleteTodo = (id) =>{
        setTodos((prevTodos)=>todos.filter((prevTodos) => prevTodos.id != id));// This creates a new array excluding the todo with the matching id
    }

    let upperCaseAll = ()=> {
        setTodos((prevTodos)=>(
            prevTodos.map((todo)=>{
                return {...todo , task : todo.task.toUpperCase()};
            })
        ));
    }

    let upperCaseOne = (id) =>{
        setTodos((prevTodos) => 
            (prevTodos.map((todo)=>{
                if(todo.id == id){
                    return { ...todo , task : todo.task.toUpperCase() }
                }else{
                    return todo;
                }
            })
        ));
    }

    let isTaskDone = (id) =>{
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>{
                if(todo.id == id){
                    return{...todo , isDone : true};
                }else{
                    return todo;
                }
            })
        );       
    }

    let allTaskDone = () =>{
        setTodos((prevTodos)=>(
            prevTodos.map((todo)=>{
                return {...todo , isDone : true};
            })
        ));
    }

    return(
        <div className="todo-container">
            <h2 className="todo-title">Todo App</h2>
            <div className="todo-input-container">
                <input 
                    className="todo-input"
                    placeholder="Add a task"
                    value={newTodo}
                    onChange={updateTodoValue}
                />
                <button className="add-button" onClick={addNewTask}>Add</button>
            </div>
            <h4>Tasks to do</h4>
            <ul className="todo-list">
                {todos.map((todo)=>(
                    <li key={todo.id} className="todo-item">
                        <span 
                            className={`todo-task ${todo.isDone ? "task-done" : ""}`}
                        >
                            {todo.task}
                        </span>
                        <div className="todo-actions">
                            <button 
                                className="todo-button delete-button" 
                                onClick={()=>deleteTodo(todo.id)}
                            >
                                Delete
                            </button> 
                            <button 
                                className="todo-button uppercase-button" 
                                onClick={()=>upperCaseOne(todo.id)}
                            >
                                Uppercase
                            </button> 
                            <button 
                                className="todo-button done-button" 
                                onClick={()=>isTaskDone(todo.id)}
                            >
                                Done
                            </button>
                        </div>
                    </li>
                ))}
            </ul> 
            <div className="global-actions">
                <button className="global-button" onClick={upperCaseAll}>Uppercase All</button>
                <button className="global-button" onClick={allTaskDone}>Mark All Done</button>
            </div>
        </div>
    );
}
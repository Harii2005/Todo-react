import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';//this will generate a unique key for every task 

export default function Todo(){

    let[todos , setTodos] = useState([{task : "sample task" , id : uuidv4()}]);
    let[newTodo , setNewTodo] = useState("");

    let addNewTask = (()=>{ //use call backs if NEWvalue depends of OLDvalue
        setTodos((prevTodos)=>(
            [...todos, { task: newTodo, id: uuidv4() }]
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

    return(
        <div>
            <div>Todo app</div>
            <input 
                placeholder="add a task"
                value={newTodo}
                onChange={updateTodoValue}
            ></input>
            <button onClick={addNewTask}>add</button><br></br>
            <h4>tasks to do</h4>
            <ul>
                {todos.map((todo)=>(
                    <li key={todo.id}>
                        <span> {todo.task} </span>
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        {/* here the problem is that if we pass it just like the "deleteTodo(todo.id)" it will execute the function not print the value when button is pressed so arrow function is used.. */}
                        <button onClick={()=>deleteTodo(todo.id)}>delete</button> 
                    </li>
                ))}
            </ul> 
            <br></br><br></br>
            <button onClick={upperCaseAll} >ToUpperCase</button>

        </div>
    );
}
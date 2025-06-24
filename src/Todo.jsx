import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';//this will generate a unique key for every task 

export default function Todo(){

    let[todos , setTodos] = useState([{task : "this is a sample task " , id : uuidv4()}]);
    let[newTodo , setNewTodo] = useState("");

    let addNewTask = (()=>{
        setTodos([...todos, { task: newTodo, id: uuidv4() }]); 
        setNewTodo("");
    })

    let updateTodoValue = ((event)=>{
        setNewTodo(event.target.value);
    });

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
                    <li key={todo.id}>{todo.task}</li>
                ))}
            </ul> 

        </div>
    );
}
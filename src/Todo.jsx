import { useState } from "react";
export default function Todo(){

    let[todos , setTodos] = useState(["this is a sample task"]);
    let[newTodo , setNewTodo] = useState("");

    let addNewTask = (()=>{
        setTodos([...todos , newTodo]);
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
                    <li>{todo}</li>
                ))}
            </ul>

        </div>
    );
}
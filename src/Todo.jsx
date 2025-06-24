import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';//this will generate a unique key for every task 

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
        <div>
            <div>Todo app</div>
            <input 
                placeholder="add a task"
                value={newTodo}
                onChange={updateTodoValue}
            ></input>
            <button onClick={addNewTask}>add</button>
            <h4>tasks to do</h4>
            <ul>
                {todos.map((todo)=>(
                    <li key={todo.id}>
                        <span style={todo.isDone ? { textDecorationLine: "line-through" } : {}}>
                            {todo.task}
                        </span>
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        {/* here the problem is that if we pass it just like the "deleteTodo(todo.id)" it will execute the function not print the value when button is pressed so arrow function is used.. */}
                        <button onClick={()=>deleteTodo(todo.id)}>delete</button> 
                        <button onClick={()=>upperCaseOne(todo.id)}>to upperCase</button> 
                        <button className="isDone" onClick={()=>isTaskDone(todo.id)}>mark as done</button>
                    </li>
                ))}
            </ul> 
            <br></br><br></br>
            <button onClick={upperCaseAll} >ToUpperCase</button>
            <button onClick={allTaskDone} >Mark all as done </button>


        </div>
    );
}
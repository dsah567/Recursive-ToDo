import { useEffect, useState } from "react";
import ToDo from "./types/Todo";
import AddToDo from "./AddToDo";

/**
 * checks the localstorage for todosubtodo if it is empty
 * @returns div tag with no todo added statement along with addtodo.tsx
 * if it is not empty 
 * @returns div tag with message todo are present along with addtodo.tsx
 */
export default function TodoList() {

  const [todoList, setTodoList] = useState<ToDo[]| null>(null);

  useEffect(() =>{
    const todos: null|string = localStorage.getItem("todoSubTodo");
    if(todos != null){
      setTodoList(JSON.parse(todos));
    }
  },[])

  /**
   * 
   * @param id which todo we have to remove
   * update the new todolist and also localstorage
   */
  function handleDelteTodo(id: string){
    if(todoList !== null) {
      const newTodoList: ToDo[] =todoList?.filter(t => t.id !== id)

      if(newTodoList.length === 0 ){
        setTodoList(null)
        localStorage.removeItem("todoSubTodo");
      } else {
        setTodoList(newTodoList);
        localStorage.setItem("todoSubTodo",JSON.stringify(newTodoList));
      }
    }
  }

  /**
   * 
   * @param id of the todo
   * @param todo new todo 
   * replace the newtodo in same place of id's todo
   */
  function handleSaveTodo(id: string, todo: ToDo) {
      if (todoList != null) {
        const newTodoList: ToDo[] = todoList.map((t) => {
          if (t.id === id) {
            return todo;
          } else {
            return t;
          }
      })
      
      setTodoList(newTodoList);
      localStorage.setItem("todoSubTodo",JSON.stringify(newTodoList));
    }
  }

  /**
   * 
   * @param id of the todo which completed option want to change
   * and then update the todolist and localstorage
   */
  function handleChangeTodo(id: string) {
    if (todoList != null) {
      const newTodoList: ToDo[] = todoList.map((t) => {
        if (t.id === id) {
          if (t.completed === true) {
            t.completed = false;
            return t;
          } else {
              //later write code check if all of its subtodo is completed
              t.completed = true; 
            return t;
          }
        } else {
          return t;
        }
    })
    
    setTodoList(newTodoList);
    localStorage.setItem("todoSubTodo",JSON.stringify(newTodoList));
  }
  }

  if(todoList === null) {
    return(
      <div>
        <div>
          <AddToDo todoList={todoList} setToDoList={setTodoList}/>
        </div>
        <div>No ToDo Added</div>
      </div>
    ) 
  }
  else {
    return(
      <div>
        <div>
         <AddToDo todoList={todoList} setToDoList={setTodoList}/>
        </div>

        <div>
          <ul>
            {
              todoList.map((todos: ToDo) => (
                <li key={todos.id}>
                  <Todo todo={todos} handleSaveTodo={handleSaveTodo} handleChangeTodo={handleChangeTodo}/>

                  <button
                  onClick={() => handleDelteTodo(todos.id)}
                  >Delete</button>
                  
                </li>
              ))
            }
          </ul>
         
        </div>
      </div>
    )
  }
}


  /**
   * function to display each todo of todolist
   * @param param0 todo
   * @param param1 handlesavetodo for adding new todo in same place of previous todo
   * @param param2 handleChangeTodo for changing the completedoption of todo
   * @returns todo with edit/save and checkbox 
   */
  function Todo({todo,handleSaveTodo, handleChangeTodo}: {todo: ToDo,handleSaveTodo: (id: string, todo: ToDo) => void, handleChangeTodo: (id: string) => void}) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [todoName, setTodoName] = useState<string>(todo.name);

    function handleSave() {
      const tempTodo: ToDo = {
       id: todo.id,
       name: todoName,
       description: todo.description,
       completed: todo.completed,
       SubToDo: todo.SubToDo
      }
      handleSaveTodo(todo.id, tempTodo);
      setIsEditing(false);
    }

    if (isEditing) {
      return (
      <>
        <input type="text" 
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}/> 

          <button onClick={() => handleSave()}>Save</button>
      </>)

    } else {
        return (<>
        <input 
        type="checkbox"
        checked={todo.completed} 
        onChange={() => handleChangeTodo(todo.id)}
        />
        
        {todo.name} 
        
        <button onClick={() => setIsEditing(true)}>Edit</button>
        </>)
    }
}

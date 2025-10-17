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
      const newToDoList: ToDo[] =todoList?.filter(t => t.id !== id)
      setTodoList(newToDoList);
      localStorage.setItem("todoSubTodo",JSON.stringify(newToDoList));
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
                  {todos.name}

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

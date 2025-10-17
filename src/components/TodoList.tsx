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

        <div>ToDos are the but code not written to display
         
        </div>
      </div>
    )
  }
}

import { useEffect, useState } from "react";
import ToDo from "./types/Todo";

/**
 * checks the localstorage for todosubtodo if it is empty
 * @returns div tag with no todo added statement
 */
export default function TodoList() {

  const [todo, setTodo] = useState<ToDo[]| null>(null);

  useEffect(() =>{
    const todos: null|string = localStorage.getItem("todoSubTodo");
    if(todos != null){
      setTodo(JSON.parse(todos));
    }
  },[])

  if(todo == null) {
    return <div>No ToDo Added</div>
  }
}

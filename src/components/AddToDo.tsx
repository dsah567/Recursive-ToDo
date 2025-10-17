import { useState } from "react"
import ToDo from "./types/Todo";

export default function AddToDo({todoList,setToDoList}: {todoList: ToDo[]| null, setToDoList:(x:ToDo[])=> void}) {
    const [name, setName] = useState<string>("write here...");
    const [description, setDescription] = useState<string>("NA");
    
    
    /**
     * add newtodo in todolist  
     */
    function handleAddTodo() {

      /**
       * @return last todo+1 in string
      */
     function ids(): string {
          if (todoList == null) return "1";
          const n: number = todoList.length-1;
          const lastId: number = parseInt(todoList[n].id) + 1;
          return lastId+"";
        }
        
        /**
         * create new todo
        */
       const tempToDo: ToDo = {
          id: ids(),
          name: name,
          description: description,
          completed: false,
          SubToDo: [],
        }
        
        
        /**
         * checks if todolist is not null then add to existing todolist and also update localstorage
         * else add the newly created todo to the list and also update localstorage
        */
       let newTodoList: ToDo[] ;
       if(todoList !== null) {
         newTodoList = [...todoList,tempToDo];
        } else {
          newTodoList = [tempToDo];
        }
        setToDoList(newTodoList);
      try {
        localStorage.setItem("todoSubTodo",JSON.stringify(newTodoList));
        alert(`${name} added todo`)
  
      } 
      catch (error) {
        alert(`${name} not added todo`)
      } finally{
        setName("write here...");
        setDescription("NA");
      }
    }
  return (
    <div>
        <label> Enter the name of ToDo  </label>
        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
        />
        <br />

        <label> Enter the description for ToDo or leave it empty  </label>
        <input
            type="text"
            value={description}
            onChange={ (e) => setDescription(e.target.value)}
        />
        <br />

        <button
            onClick={()=>{handleAddTodo()}}
        >Add</button>
    </div>
  )
}

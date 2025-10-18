import { useState } from "react"
import ToDo from "./types/Todo";
import { useContext } from "react";
import { ToDoList as ContestToDoList, setToDoList as SetContestToDoList} from "./ToDoListContext";

export default function AddToDo() {
    const [name, setName] = useState<string>("");
    const todoList = useContext(ContestToDoList);
    const setToDoList = useContext(SetContestToDoList);
    
    
    /**
     * add newtodo in todolist  
     */
    function handleAddTodo() {

      if (name == ""){
        alert("Please Enter the todo name");
        return;
      }

      /**
       * @return last todo+1 in string
      */
     function ids(): string {
          if (todoList.length == 0) return "1";
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
          completed: false,
          SubToDo: [],
        }
        
        
        /**
         * checks if todolist is not null then add to existing todolist and also update localstorage
         * else add the newly created todo to the list and also update localstorage
        */
       let newTodoList: ToDo[] ;
       if(todoList.length > 0) {
         newTodoList = [...todoList,tempToDo];
        } else {
          newTodoList = [tempToDo];
        }
        setToDoList(newTodoList);
      try {
        localStorage.setItem("todoSubTodo",JSON.stringify(newTodoList));
        alert(`${name} -- todo added`)
  
      } 
      catch (error) {
        alert(`${name} not added todo`)
      } finally{
        setName("write here...");
      }
    }
  return (
    <div className="bg-[#b0b0ebee] p-2 rounded-2xl">
        <label> Enter the name of ToDo: </label>
        <input
        className="bg-white m-2 rounded-2xl p-2 "
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name of todo"
            required
        />

          <button
          className="bg-cyan-400 hover:bg-cyan-500 text-white font-semibold py-2 px-6 rounded-full"
              onClick={()=>{handleAddTodo()}}
          >Add</button>
    </div>
  )
}

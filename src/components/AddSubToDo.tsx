import ToDo from "./types/Todo";
import { useContext, useState } from "react";
import { ToDoList as ContestToDoList} from "./ToDoListContext";

/**
 * 
 * @param param0 subtodoarray(subtodo property of todo) in which we have to add new sub todo
 * @returns input field to add sub todo
 */
export default function AddSubToDo({subToDoArrar}:{subToDoArrar: ToDo[]}) {

    const [name, setName] = useState<string>("");
    const todoList = useContext(ContestToDoList);

/**
 * add newsubtodo in subtodoarray  
 */
function handleAddSubTodo() {

    if (name == ""){
        alert("Please Enter the sub-todo name");
        return;
    }

    /**
     * @return last subtodo+1 in string
    */
    function ids(): string {
        if (subToDoArrar.length == 0) return "1";
        const n: number = subToDoArrar.length-1;
        const lastId: number = parseInt(subToDoArrar[n].id) + 1;
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
        subToDoArrar.push(tempToDo)
    try {
        localStorage.setItem("todoSubTodo",JSON.stringify(todoList));
        alert(`${name} --   sub-todo added`)

    } 
    catch (error) {
        alert(`${name} not sub-todo added`)
    } finally{
        setName("");
    }
    }

  return (
    <div className="bg-[#b0b0ebee] p-2 rounded-2xl">
        <label> Enter the name of Sub-ToDo: </label>
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
              onClick={()=>{handleAddSubTodo()}}
          >Add</button>
    </div>
  )
}

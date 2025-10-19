import { useState } from "react";
import ToDo from "./types/Todo";
import { useContext } from "react";
import { ToDoList as ContestToDoList} from "./ToDoListContext";
import { Todo } from "./TodoList";


export default function ShowSubToDo({todo}:
    {todo: ToDo}
) {

    const [todoList, setTodoList] = useState<ToDo[]>(todo.SubToDo);
    const mainToDoList:ToDo[] = useContext(ContestToDoList)

      /**
     * 
     * @param id which todo we have to remove
     * update the new todolist and also localstorage
     */
    function handleDelteTodo(id: string){
        const newTodoList: ToDo[] =todoList?.filter(t => t.id !== id)
        setTodoList(newTodoList);
        localStorage.setItem("todoSubTodo",JSON.stringify(mainToDoList));
    }

    /**
     * 
     * @param id of the todo
     * @param todo new todo 
     * replace the newtodo in same place of id's todo
     */
    function handleSaveTodo(id: string, todo: ToDo) {
        const newTodoList: ToDo[] = todoList.map((t) => {
        if (t.id === id) {
            return todo;
        } else {
            return t;
        }
    })
        setTodoList(newTodoList);
        localStorage.setItem("todoSubTodo",JSON.stringify(mainToDoList));
    }

    /**
     * 
     * @param id of the todo which completed option want to change
     * and then update the todolist and localstorage
     */
    function handleChangeTodo(id: string) {
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
        localStorage.setItem("todoSubTodo",JSON.stringify(mainToDoList));
    }

  return (
    <>
        <div className="bg-[#b0b0ebee]">
            {todo.SubToDo.length == 0? ( <div className="p-2 rounded-2xl" >No Sub-ToDo Added</div> ): (
                <div className=" rounded-2xl" >
                    <ul>
                    {
                    todo.SubToDo.map((todos: ToDo) => (
                        <li key={todos.id}
                        className="ml-5 rounded-2xl bg-yellow-100 "
                        >
                            <div className="p-2  m-1">
                            <Todo todo={todos} handleSaveTodo={handleSaveTodo} handleChangeTodo={handleChangeTodo} handleDelteTodo={handleDelteTodo}/>
                            </div>
                        </li>
                    ))
                    }
                    </ul>
                </div>
            )}
        </div>
    </>
  )
}
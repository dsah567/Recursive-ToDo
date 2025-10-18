import { useEffect, useState } from "react";
import ToDo from "./types/Todo";
import AddToDo from "./AddToDo";
import FurtherDetail from "./FurtherDetail";
import { ToDoList as ContestToDoList, setToDoList as SetContestToDoList} from "./ToDoListContext";

/**
 * checks the localstorage for todosubtodo if it is empty
 * @returns div tag with no todo added statement along with addtodo.tsx
 * if it is not empty 
 * @returns div tag with message todo are present along with addtodo.tsx
 */
export default function TodoList() {

  const [todoList, setTodoList] = useState<ToDo[]>([]);

  useEffect(() =>{
    const todos: null|string = localStorage.getItem("todoSubTodo");
    if(todos != null){
      setTodoList(JSON.parse(todos));
    } else {
      const temptodoList: ToDo[] = [];
      localStorage.setItem("todoSubTodo",JSON.stringify(temptodoList))
    }
  },[])

  /**
   * 
   * @param id which todo we have to remove
   * update the new todolist and also localstorage
   */
  function handleDelteTodo(id: string){
      const newTodoList: ToDo[] =todoList?.filter(t => t.id !== id)
        setTodoList(newTodoList);
        localStorage.setItem("todoSubTodo",JSON.stringify(newTodoList));
 
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
      localStorage.setItem("todoSubTodo",JSON.stringify(newTodoList));
    
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
    localStorage.setItem("todoSubTodo",JSON.stringify(newTodoList));

  }

  return(
    <ContestToDoList.Provider value={todoList}>
      <SetContestToDoList.Provider value={setTodoList}>
      <div>
        <div className="m-2">
          <AddToDo/>
        </div>

        <div>
          {todoList.length == 0? ( <div className="bg-[#b0b0ebee] p-2 rounded-2xl" >No ToDo Added</div> ): (
            <div className="bg-[#b0b0ebee] p-2 rounded-2xl" >
            <ul>
              {
                todoList.map((todos: ToDo) => (
                  <li key={todos.id}
                  className="p-2 m-1 bg-gray-400 rounded-2xl"
                  >
                    <div className="my-5">
                      <Todo todo={todos} handleSaveTodo={handleSaveTodo} handleChangeTodo={handleChangeTodo} handleDelteTodo={handleDelteTodo}/>
                    </div>
                  </li>
                ))
              }
            </ul>
           
          </div>
          )}
        </div>
        
      </div>
      </SetContestToDoList.Provider>
    </ContestToDoList.Provider>
  ) 
}


  /**
   * function to display each todo of todolist
   * @param param0 todo
   * @param param1 handlesavetodo for adding new todo in same place of previous todo
   * @param param2 handleChangeTodo for changing the completedoption of todo
   * @returns todo with edit/save and checkbox 
   */
  function Todo({todo,handleSaveTodo, handleChangeTodo, handleDelteTodo}: 
      {todo: ToDo,handleSaveTodo: (id: string, todo: ToDo) => void, handleChangeTodo: (id: string) => void, handleDelteTodo :(id: string) => void}) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [todoName, setTodoName] = useState<string>(todo.name);
    const [showFutherDetail, setShowFutherDetail] = useState<boolean>(false);
    const [addSubToDo, setAddSubToDo]  = useState<boolean>(false);

    function handleSave() {
      const tempTodo: ToDo = {
       id: todo.id,
       name: todoName,
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
        className="bg-white m-1 rounded-2xl p-2 w-full"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}/> 

          <button
          className="bg-blue-400 rounded-xl px-4 mx-1 mt-3"
           onClick={() => handleSave()}>Save</button>
      </>)

    } else {
        return (
        <>

        <div>
        <input 
        className="rounded-2xl"
        type="checkbox"
        checked={todo.completed} 
        onChange={() => handleChangeTodo(todo.id)}
        />
        <span className="bg-yellow-100 py-2 px-4 rounded-2xl">
          {todo.name} 
        </span>
        
        <button
        className="bg-blue-400 rounded-xl px-4 mx-1 mt-3"
        onClick={() => setIsEditing(true)}>Edit</button>

        <button
          className="bg-red-500 rounded-xl px-4 mx-1 mt-3"
          onClick={() => handleDelteTodo(todo.id)}
          >Delete</button>

        <button
        className="bg-blue-400 rounded-xl px-4 mx-1 mt-3"
        onClick={() =>{ 
          setShowFutherDetail(true)
          setAddSubToDo(true)}}
        >Add SubToDo</button>

        <button
        className="bg-blue-400 rounded-xl px-4 mx-1 mt-3"
        onClick={() =>{ 
          setShowFutherDetail(true)
          setAddSubToDo(false)}}
        >Show SubToDo</button>
        </div>
        <div>
          {(showFutherDetail== false) ? " " : (
            <div 
            className="mt-3"
            >
              <FurtherDetail addSubToDo={addSubToDo} />
            </div>
          )
          }
        </div>
        </>)
    }
}
import TodoList from "./components/TodoList"

/**
 * @returns TodoList
 */
function App() {
  
return (
    <div className="m-4">
      <div className="text-center">
        <span className="bg-[#8440ac] m-4 p-2 rounded">
          ToDo - SubToDo
        </span>
      </div>
      <div className="m-4" >
        <div>
          <TodoList/>
        </div>
      </div>
    </div>
  )
}

export default App

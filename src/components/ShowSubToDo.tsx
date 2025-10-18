import ToDo from "./types/Todo";

export default function ShowSubToDo({todo}:
    {todo: ToDo}
) {
  return (
    <>
        <div className="bg-[#b0b0ebee]">
            {todo.SubToDo.length == 0? ( <div className="p-2 rounded-2xl" >No Sub-ToDo Added</div> ): (
                <div className=" rounded-2xl" >
                    <ul>
                    {
                    todo.SubToDo.map((todos: ToDo) => (
                        <li key={todos.id}
                        className="ml-5 rounded-2xl "
                        >
                            <div className="bg-yellow-100 p-2  m-1">
                            {todos.name}
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

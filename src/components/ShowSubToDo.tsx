import ToDo from "./types/Todo";

export default function ShowSubToDo({todo}:
    {todo: ToDo}
) {
  return (
    <>
        <div>
            {todo.SubToDo.length == 0? ( <div className="p-2 rounded-2xl" >No ToDo Added</div> ): (
                <div className=" p-2 rounded-2xl" >
                    <ul>
                    {
                    todo.SubToDo.map((todos: ToDo) => (
                        <li key={todos.id}
                        className="p-2 m-1 rounded-2xl bg-yellow-100"
                        >
                            <div className="">
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

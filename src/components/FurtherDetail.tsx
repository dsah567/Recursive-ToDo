import AddSubToDo from "./AddSubToDo"
import ToDo from "./types/Todo"

/**
 * 
 * @param param0 addSubToDo if true 
 * @param param1 todo in which subtodo properties(subtodoarray ) we have to add new subtodo
 * @returns AddSubToDo else ShowSubToDo
 */
export default function FurtherDetail({addSubToDo, todo}:
    {addSubToDo: boolean, todo: ToDo}
) {
  
    if (addSubToDo) {
        return <AddSubToDo subToDoArrar={todo.SubToDo}/>
    } else {
        return <>show subtodos</>
    }
}

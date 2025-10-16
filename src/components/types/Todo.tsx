/**
 * ToDo type contains 
 *      id for sequence 
 *      name: name of todo
 *      completedL: to mark checkbox as done or not not
 *      description: provide detail about todo or leave it empty 
 *      SubToDo: contains further todos, among that todo may have todo or leave it empty
 */

type ToDo = {
    id: number,
    name: string,
    completed: boolean,
    description: string| null,
    SubToDo: Array<ToDo>| null
};

export default ToDo;
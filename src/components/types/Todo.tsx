/**
 * ToDo type contains 
 *      id for sequence 
 *      name: name of todo
 *      completedL: to mark checkbox as done or not not
 *      SubToDo: contains further todos ids 
 */

type ToDo = {
    id: string,
    name: string,
    completed: boolean,
    SubToDo: Array<ToDo>
};

export default ToDo;
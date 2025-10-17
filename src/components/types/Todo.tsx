/**
 * ToDo type contains 
 *      id for sequence 
 *      name: name of todo
 *      completedL: to mark checkbox as done or not not
 *      description: provide detail about todo or leave it empty 
 *      SubToDo: contains further todos ids 
 */

type ToDo = {
    id: string,
    name: string,
    completed: boolean,
    description: string| null,
    SubToDo: Array<string>
};

export default ToDo;
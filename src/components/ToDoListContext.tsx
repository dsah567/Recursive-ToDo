import { createContext } from "react";
import ToDo from "./types/Todo";

export const ToDoList = createContext<ToDo[]>([]);
export const setToDoList = createContext<(x: ToDo[]) => void>(() => {});
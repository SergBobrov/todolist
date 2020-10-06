import {ToDoListType} from "../App";
import {v1} from "uuid";

export type StateType = {
    name: string;
    age: number;
    childrenCount: number;
}

export type ActionType = {
    type: string
    [key: string]: any
}


export const todolistsReducer = (state: Array<ToDoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id);
        case 'ADD-TODOLIST':
            const newTodoList: ToDoListType = {
                id: v1(),
                title: action.title,
                filter: "all"
            }
            return [...state, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(t => {
                if (t.id === action.id) {
                    return {...t, title: action.title}
                }
                return t
            })

        case "CHANGE-TODOLIST-FILTER":
            return state.map(t => {
                if (t.id === action.id) {
                    return {...t, filter: action.filter}
                }
                return t
            })

        default:
            throw new Error("I don't understand this type")
    }

}


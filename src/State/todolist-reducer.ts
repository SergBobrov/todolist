import {FilterValuesType, ToDoListType} from "../App";
import {v1} from "uuid";

export type StateType = {
    name: string;
    age: number;
    childrenCount: number;
}

type ActionType =
    ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof ChangeTodolistFilterAC>

export const todolistsReducer = (state: Array<ToDoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id);
        case 'ADD-TODOLIST':
            const newTodoList: ToDoListType = {
                id: action.todolistId,
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

export const RemoveTodolistAC = (todolostID: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolostID} as const
};

export const AddTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()} as const
};

export const ChangeTodolistTitleAC = (todolostID: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolostID, title: title} as const
};

export const ChangeTodolistFilterAC = (todolostID: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolostID, filter: filter} as const
};
import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistAC, RemoveTodolistAC} from "./todolist-reducer";

export type ActionType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof RemoveTodolistAC>


export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].filter(t => t.id != action.taskID)
            return copyState
        case 'ADD-TASK':
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: [...state[action.todolistId], newTask]}

        case 'CHANGE-TASK':
            let toDolistTasks = state[action.todolistId]
            let task = toDolistTasks.find(t => t.id === action.taskID);
            if (task) {
                task.isDone = action.isDone;
            }
            return {...state, [action.todolistId]: toDolistTasks}
        case 'CHANGE-TITLE': {
            let toDolistTasks = state[action.todolistId]
            let task = toDolistTasks.find(t => t.id === action.taskID);
            if (task) {
                task.title = action.title;
            }
            return {...state, [action.todolistId]: toDolistTasks}
        }
        case 'ADD-TODOLIST': {
            let id = action.todolistId
            return {...state, [id]: []}
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            throw new Error("I don't understand this type")
    }

}

export const removeTaskAC = (taskID: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskID: taskID, todolistId: todolistId} as const
};

export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title: title, todolistId: todolistId} as const
};

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK', taskID: taskID, isDone: isDone, todolistId: todolistId} as const
};

export const changeTaskTitleAC = (taskID: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TITLE', taskID: taskID, title: title, todolistId: todolistId} as const
};


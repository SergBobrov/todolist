import {TasksStateType, ToDoListType} from "../App";
import {tasksReducer} from "./user-reducer";
import {todolistsReducer, AddTodolistAC} from "./todolist-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<ToDoListType> = [];

    const action = AddTodolistAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(idFromTodolists);
    expect(idFromTodolists).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});

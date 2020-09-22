import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";


type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, toDoListID: string) => void
    setTask: (t: string, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeToDoList: (s: string) => void

}

export function TodoList(props: PropsType) {

    const addTask = (title: string) => {
        props.setTask(title, props.id);
    };

    const onAllClickHendler = () => {
        props.changeFilter("all", props.id)
    };

    const onActiveClickHendler = () => {
        props.changeFilter("active", props.id)
    };

    const onConpletedClickHendler = () => {
        props.changeFilter("completed", props.id)
    };

    const deleteTask = () => {
        props.removeToDoList(props.id);
    };

    return (
        <div>
            <h3>{props.title}</h3>
            <AddItemForm addItem={addTask}/>
             <ul>
                {
                    props.tasks.map(t => {
                            const removeTask = () => props.removeTask(t.id, props.id)

                            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {

                                props.changeStatus(t.id, e.currentTarget.checked, props.id)
                            };

                            return (
                                <li key={t.id} className={t.isDone ? "is-done" : "" }>
                                    <input type="checkbox" checked={t.isDone}
                                           onChange={changeStatus}
                                    />
                                    <span>{t.title}</span>
                                    <button onClick={removeTask
                                    }>
                                        x
                                    </button>
                                </li>);
                        }
                    )
                }


            </ul>
            <div>
                <button
                    className={props.filter==="all" ? "active-filter" : ""}
                    onClick={onAllClickHendler}>All
                </button>
                <button
                    className={props.filter==="active" ? "active-filter" : ""}
                    onClick={onActiveClickHendler}>Active
                </button>
                <button
                    className={props.filter==="completed" ? "active-filter" : ""}
                    onClick={onConpletedClickHendler}>Completed
                </button>
            </div>
            <button onClick={deleteTask}>delete task</button>
        </div>
    );
}
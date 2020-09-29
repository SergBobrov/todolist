import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditAbleSpan from "./EditAbleSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";


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
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeToDolistTitle: (toDolistID: string, title: string) => void

}

export function TodoList(props: PropsType) {

    const tasks = props.tasks.map(t => {
            const removeTask = () => props.removeTask(t.id, props.id)

            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {

                props.changeStatus(t.id, e.currentTarget.checked, props.id)
            };

            const changeTaskTitle = (value: string) => {
                props.changeTaskTitle(t.id, value, props.id);
            };

            return (
                <li key={t.id} className={t.isDone ? "is-done" : ""}>
                    <Checkbox
                        color={"primary"}
                        checked={t.isDone}
                        onChange={changeStatus}
                    />
                    <EditAbleSpan value={t.title} changeValue={changeTaskTitle}/>

                    <IconButton onClick={removeTask
                    }> <Delete/></IconButton>
                </li>);
        }
    )

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

    const changeToDolistTitle = (title: string) => {
        props.changeToDolistTitle(props.id, title)
    };

    return (
        <div>
            <h3><EditAbleSpan value={props.title} changeValue={changeToDolistTitle}></EditAbleSpan>
                <IconButton onClick={deleteTask}><Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: "none", paddingLeft: "0"}
            }>
                {tasks}
            </ul>
            <div>
                <Button
                    size={"small"}
                    color={props.filter === "all" ? "primary" : "default"}
                    variant={"contained"}
                    onClick={onAllClickHendler}>All
                </Button>
                <Button
                    size={"small"}
                    color={props.filter === "active" ? "primary" : "default"}
                    variant={"contained"}
                    onClick={onActiveClickHendler}>Active
                </Button>
                <Button
                    size={"small"}
                    color={props.filter === "completed" ? "primary" : "default"}
                    variant={"contained"}
                    onClick={onConpletedClickHendler}>Completed
                </Button>
            </div>

        </div>
    );
}
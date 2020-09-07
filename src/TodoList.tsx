import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType, TaskType} from "./App";


type PropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    setTask: (t: string) => void
    changeStatus: (taskID: string, isDone: boolean) => void

}

export function TodoList(props: PropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title) {
            props.setTask(title.trim());
            setTitle("");
        } else {
            setError("Title is required!");
        }

    }
    const onChangeHendler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const onKeyPressHendler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask()
        }
    };

    const onAllClickHendler = () => {
        props.changeFilter("all")
    };

    const onActiveClickHendler = () => {
        props.changeFilter("active")
    };

    const onConpletedClickHendler = () => {
        props.changeFilter("completed")
    };

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onKeyPress={onKeyPressHendler}
                       onChange={onChangeHendler}
                       className={error ? "error" : ""}
                />

                <button onClick={addTask}
                >+
                </button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                            const removeTask = () => props.removeTask(t.id)

                            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {

                                props.changeStatus(t.id, e.currentTarget.checked)
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
        </div>
    );
}
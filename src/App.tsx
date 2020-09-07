import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed";


function App() {

    /*let [tasks, setTasks] = useState<Array<TaskType>>*/

    let [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "GraphQL", isDone: true},
            {id: v1(), title: "Rest API", isDone: true}
        ]
    )


    function changeStatus(taskID: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskID);
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks]);
        }
    }

    function setTask(title: string) {
        let task = {id: v1(), title: title, isDone: true}
        let newTask = [task, ...tasks]
        setTasks(newTask)
    }

    let [filter, setFilter] = useState<FilterValuesType>(
        "all")

    function removeTasks(taskId: string) {
        let newTasks = tasks.filter(t => t.id !== taskId);
        setTasks(newTasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForTodoList = tasks;
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }


    return (
        <div className="App">
            <TodoList title={"What to learn"}
                      tasks={tasksForTodoList}
                      removeTask={removeTasks}
                      changeFilter={changeFilter}
                      setTask={setTask}
                      changeStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;

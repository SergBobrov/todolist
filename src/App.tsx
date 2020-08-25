import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed";


function App() {

    /*let [tasks, setTasks] = useState<Array<TaskType>>*/

    let [tasks, setTasks] = useState(
        [
            {id: 1, title: "HTML&CSS", isDone: true},
            {id: 2, title: "JS", isDone: false},
            {id: 3, title: "React", isDone: true},
            {id: 4, title: "GraphQL", isDone: true},
            {id: 5, title: "Rest API", isDone: true}
        ]
    )



    let[filter, setFilter]=useState<FilterValuesType>(
        "all")

    /*
    let tasks: Array<TaskType> = [
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: false},
    {id: 3, title: "React", isDone: true},
    {id: 4, title: "GraphQL", isDone: true},
    {id: 5, title: "Rest API", isDone: true}

];*/

    function removeTasks(taskId: number) {
        let newTasks = tasks.filter(t => t.id !== taskId);
        setTasks(newTasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForTodoList = tasks;
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }


    return (
        <div className="App">
            <TodoList title={"What to learn"}
                      tasks={tasksForTodoList}
                      removeTask={removeTasks}
                      changeFilter={changeFilter}

                        />
        </div>
    );
}

export default App;

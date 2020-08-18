import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean

}

function App() {
    let jsTasks: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: false},
        {id: 3, title: "React", isDone: true}
    ];

    let petsTasks: Array<TaskType> = [
        {id: 1, title: "Dog", isDone: false},
        {id: 2, title: "Cat", isDone: true},
        {id: 3, title: "Piggy", isDone: true}
    ];


    return (
        <div className="App">
            <h1>todo</h1>
            <TodoList title={"What to learn"} tasks={jsTasks} />
            <TodoList title={"Pets"} tasks={petsTasks}/>
        </div>
    );
}

export default App;

import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {Menu} from "@material-ui/icons";


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed";

export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType;
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [toDolists, settoDolist] = useState<Array<ToDoListType>>([
            {id: todoListId1, title: "What to do", filter: "all"},
            {id: todoListId2, title: "What to learn", filter: "all"}
        ]
    )

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "GraphQL", isDone: true},
            {id: v1(), title: "Rest API", isDone: true}
        ],
        [todoListId2]: [{id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "English", isDone: false},
            {id: v1(), title: "French", isDone: true},
            {id: v1(), title: "Russian", isDone: true},
            {id: v1(), title: "Spanish", isDone: true},
        ]
    })

    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        let toDolistTasks = tasks[todoListID]
        let task = toDolistTasks.find(t => t.id === taskID);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function addTask(title: string, todoListID: string) {
        let toDolistTasks = tasks[todoListID]
        let task = {id: v1(), title: title, isDone: false}
        tasks[todoListID] = [task, ...toDolistTasks]
        setTasks({...tasks});
    }


    function removeTasks(taskId: string, todoListID: string) {
        let toDolistTask = tasks[todoListID]

        tasks[todoListID] = toDolistTask.filter(t => t.id !== taskId);
        setTasks({...tasks});

    }

    function addTodoList(title: string) {
        const newTodoListID = v1();
        const newTodoList: ToDoListType = {
            id: newTodoListID,
            title: title,
            filter: "all"
        }
        settoDolist([...toDolists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }


    function changeFilter(value: FilterValuesType, toDoListID: string) {
        let toDolist = toDolists.find(t => t.id === toDoListID);
        if (toDolist) {
            toDolist.filter = value;
            settoDolist([...toDolists])
        }
    }

    function removeToDoList(todolistID: string) {
        settoDolist(toDolists.filter(t => t.id !== todolistID));
        delete tasks[todolistID];
    }


    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        const todolistTask = tasks[todoListID]
        const task = todolistTask.find(task => task.id === taskID)
        if (task) {
            task.title = title
            setTasks({...tasks});
        }
    }

    function changeToDolistTitle(toDolistID: string, title: string) {
        const todolist = toDolists.find(t => t.id === toDolistID);
        if (todolist) {
            todolist.title = title
            settoDolist([...toDolists]);
        }
    }


    return (

        <div className={"App"}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed >

                <Grid style={{padding: "25px"}}><AddItemForm addItem={addTodoList}/></Grid>

                <Grid container spacing={5}>
                    {
                        toDolists.map(t => {

                            let tasksForTodoList = tasks[t.id];
                            if (t.filter === "active") {
                                tasksForTodoList = tasks[t.id].filter(t => !t.isDone)
                            }
                            if (t.filter === "completed") {
                                tasksForTodoList = tasks[t.id].filter(t => t.isDone)
                            }

                            return (
                                <Grid key={t.id} item>
                                    <Paper style={{padding: "25px"}}>
                                        <TodoList
                                            changeToDolistTitle={changeToDolistTitle}
                                            removeToDoList={removeToDoList}
                                            key={t.id}
                                            id={t.id}
                                            title={t.title}
                                            tasks={tasksForTodoList}
                                            removeTask={removeTasks}
                                            changeFilter={changeFilter}
                                            setTask={addTask}
                                            changeStatus={changeStatus}
                                            filter={t.filter}
                                            changeTaskTitle={changeTaskTitle}
                                        />
                                    </Paper>
                                </Grid>

                            );
                        })
                    }
                </Grid>
            </Container>
        </div>

    );
}

export default App;

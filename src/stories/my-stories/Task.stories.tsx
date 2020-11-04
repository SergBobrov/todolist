import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../../components/Task";

export default {
    title: 'Task',
    component: Task,
    argTypes: {
        addItem: {
            description: 'callback witch will called'
        }
    },
} as Meta;


const changeTaskStatus = action('Change')
const changeTaskTitle = action('Change')
const removeTask = action('Remove')


let task = {
    id: '2',
    isDone: true,
    title: 'JS'
}

let task2 = {
    id: '2',
    isDone: true,
    title: 'React'
}

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;


export const Primary = Template.bind({});


Primary.args = {
    changeTaskStatus: changeTaskStatus,
    changeTaskTitle: changeTaskTitle,
    removeTask: removeTask,
    task: task,
    todolistId: "todolist1",
};


export const Secondary = Template.bind({});

Secondary.args = {
    changeTaskStatus: changeTaskStatus,
    changeTaskTitle: changeTaskTitle,
    removeTask: removeTask,
    task: task2,
    todolistId: "todolist1",
};




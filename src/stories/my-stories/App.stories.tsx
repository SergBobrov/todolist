import React from 'react'
import {Meta, Story} from "@storybook/react/types-6-0";
import {App} from "../../App";
import {ReduxStoreProviderDecorator} from "./ReduxSoreProviderDecoratot";


export default {
    title: "App",
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;


const Template: Story = (args) => <App/>;


export const Base = Template.bind({});


Base.args = {};
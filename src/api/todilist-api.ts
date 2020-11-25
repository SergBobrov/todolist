import axios from 'axios'

type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}

type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TodolistType
    }
}


const instance = axios.create( {
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'ba923d45-178b-4234-b4ae-b2f1bee1cd06'
    }
})



export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType>('todo-lists')
    },

    createTodolist(title: string) {
        return instance.post<CreateTodolistResponseType>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return axios.delete(`todo-lists/${todolistId}`)
    },


    updateTodolist(todolistId: string, title: string) {
        return axios.put(`todo-lists/${todolistId}`,
            {title: title})
    },
}
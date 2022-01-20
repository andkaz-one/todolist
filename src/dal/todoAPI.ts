import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': "b7a33105-0b7c-4d3b-b54b-cdc3f26f8765"
    }
})

export const todoAPI = {
    getTodolists() {
        return instance.get('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post('todo-lists', {title: title})
    }
}





//types

export type GetTodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}




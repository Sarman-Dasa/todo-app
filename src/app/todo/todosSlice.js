import { createSlice } from "@reduxjs/toolkit";
import todos from "../../Data/todos";
const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: todos,
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push(action.payload)
        },

        deleteTodo(state, action) {
            let index = state.todos.findIndex((item) => item.id === action.payload.id);
            state.todos.splice(index, 1);
        },

        updateTodo(state, action) {
            let index = state.todos.findIndex((item) => item.id === action.payload.id);
            if (index !== -1) {
                state.todos[index] = action.payload;
            }
        },

        sortOrder(state, action) {
            let key = action.payload;
            console.log("call");
            state.todos.sort((a, b) => a[key].localeCompare(b[key], 'en', { sensitivity: 'accent' }))
        }
    }
})

export const { addTodo, deleteTodo, updateTodo, sortOrder } = todosSlice.actions;
export default todosSlice.reducer;
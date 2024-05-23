import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push(action.payload)
        },

        deleteTodo(state, action) {
            state.todos = state.todos.filter((item) => item.id !== action.payload)
        }
    }
})

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
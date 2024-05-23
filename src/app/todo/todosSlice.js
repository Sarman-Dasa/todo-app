import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [{
            id: 'sS4fbR5K5H',
            title: 'first',
            description: 'test',
            dueDate: '2024-05-23'
        }],
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push(action.payload)
        },

        deleteTodo(state, action) {
            state.todos = state.todos.filter((item) => item.id !== action.payload)
        },

        updateTodo(state, action) {
            let index = state.todos.findIndex((item) => item.id === action.payload.id);
            if (index !== -1) {
                state.todos[index] = action.payload;
            }
        }
    }
})

export const { addTodo, deleteTodo, updateTodo } = todosSlice.actions;
export default todosSlice.reducer;
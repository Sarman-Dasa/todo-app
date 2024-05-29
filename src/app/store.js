import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./todo/todosSlice";
import appSlice from './index'
export const store = configureStore({
    reducer: {
        todos:todosSlice,
        app:appSlice
    }
 })
 export default store;
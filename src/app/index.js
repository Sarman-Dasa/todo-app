import { createSlice } from "@reduxjs/toolkit";
const appSlice = createSlice({
    name: 'app',
    initialState: {
        isFullLayout: false,
        user:[]
    },
    reducers:{
        updateLayout(state,action) {
            state.isFullLayout = action.payload;
        }
    }
})

export const { updateLayout } = appSlice.actions
export default appSlice.reducer
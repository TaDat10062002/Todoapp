import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

const auth = authReducer;
export type RootState = ReturnType<typeof store.getState>
const store = configureStore({
    reducer: {
        auth: authReducer
    },
})

export default store;
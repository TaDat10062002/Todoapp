import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getInitialState = () => {
    if (typeof window !== 'undefined') {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user) {
            return {
                isLoggedIn: user.isLoggedIn ?? false,
                accessToken: user.accessToken ?? null,
                loggedUser: user.loggedUser ?? null,
            }
        }
    }
    return {
        isLoggedIn: false,
        accessToken: null,
        loggedUser: null,
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState: getInitialState(),
    reducers: {
        LOGIN: (state: any, action: PayloadAction<{ loggedUser: string, accessToken: string }>) => {
            state.isLoggedIn = true;
            state.accessToken = action.payload.accessToken;
            state.loggedUser = action.payload.loggedUser;
        },
        LOGOUT: (state: any) => {
            state.isLoggedIn = false;
            state.accessToken = null;
            state.loggedUser = null;
            localStorage.removeItem('user');
        }
    }
})

export const { LOGIN, LOGOUT } = authSlice.actions;
export default authSlice.reducer;
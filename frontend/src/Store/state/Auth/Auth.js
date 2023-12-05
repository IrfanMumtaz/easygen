import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    isAuthenticated: localStorage.getItem('token') ? true : false,
};

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        loginInit: (state) => {
            return {
                ...state,
                isLoading: true,
                isAuthenticated: false,
            };
        },
        loginSuccess: (state) => {
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
            };
        },
        loginFail: (state) => {
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
            };
        },
    },
});

export const { loginInit, loginSuccess, loginFail } =
    authenticationSlice.actions;
export const loginReducer = authenticationSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    isAuthenticated: localStorage.getItem('token') ? true : false,
};

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        registerInit: (state) => {
            return {
                ...state,
                isLoading: true,
                isAuthenticated: false,
            };
        },
        registerSuccess: (state, action) => {
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
            };
        },
        registerFail: (state) => {
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
            };
        },
    },
});

export const { registerInit, registerSuccess, registerFail } =
    authenticationSlice.actions;
export const registerReducer = authenticationSlice.reducer;

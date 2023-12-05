import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    isAuthenticated: true,
};

export const logoutSlice = createSlice({
    name: 'logout',
    initialState,
    reducers: {
        logoutInit: (state) => {
            return {
                ...state,
                isLoading: true,
                isAuthenticated: true,
            };
        },
        logoutSuccess: (state) => {
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
            };
        },
        logoutFail: (state) => {
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
            };
        },
    },
});

export const { logoutInit, logoutSuccess, logoutFail } = logoutSlice.actions;
export const logoutReducer = logoutSlice.reducer;

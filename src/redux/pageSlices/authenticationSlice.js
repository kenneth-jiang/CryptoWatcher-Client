import { createSlice } from '@reduxjs/toolkit';
import crypto from 'crypto';

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState: {
        loggedIn: true,
        loginError: false,
        displayModal: false,
    },
    reducers: {
        authenticate: (state, action) => {
            if (crypto.createHmac("sha256", process.env.PASSWORD).digest("hex") === window.sessionStorage.getItem("key")) {
                return { ...state, loggedIn: true };
            };
            return { ...state, loggedIn: false };
        },
        login: (state, action) => {
            if (process.env.PASSWORD === action.payload) {
                window.sessionStorage.setItem("key", crypto.createHmac("sha256", action.payload).digest("hex"));
                return { ...state, loggedIn: true, loginError: false,  displayModal: false };
            };
            return { ...state, loggedIn: false, loginError: true };
        },
        logout: (state, action) => {
            window.sessionStorage.removeItem("key");
            return { ...state, loggedIn: false };
        },
        openModal: (state, action) => {
            return { ...state, displayModal: true };
        },
        closeModal: (state, action) => {
            return { ...state, displayModal: false, loginError: false };
        },
    }
});

export const { authenticate, login, logout, openModal, closeModal } = authenticationSlice.actions;

export default authenticationSlice.reducer;
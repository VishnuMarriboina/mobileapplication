import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null, // Holds user data after login
    isAuthenticated: false, // Authentication status 
    loading: false, // Loading state for async actions
    error: null, // Stores any login error messages
    isNewUser: false, // to comes from the backend exixting or new user..
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state) => {
            state.loading = false;
            state.isAuthenticated = true;
            // state.user = action.payload; // Store user details
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isNewUser = false;
            state.loading = false;
            state.error = null;
        },
        setUser: (state, action) => {
            state.loading = false;
            state.isNewUser = action.payload;
            state.error = null;
        }
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, setUser } = authSlice.actions;

// export const selectIsAuthenticated = state => state.Auth.isAuthenticated;
export const selectIsNewUser = state => state.Auth.isNewUser;
export const selectAuthError = state => state.Auth.error;

export default authSlice.reducer;






// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     isLoading: true,
//     isLoggedIn: false,
//     isNewUser: true,
// };

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         setLoading: (state, action) => { state.isLoading = action.payload; },
//         setLoggedIn: (state, action) => { state.isLoggedIn = action.payload; },
//         setNewUser: (state, action) => { state.isNewUser = action.payload; },
//     },
// });

// export const { setLoading, setLoggedIn, setNewUser } = authSlice.actions;
// export default authSlice.reducer;

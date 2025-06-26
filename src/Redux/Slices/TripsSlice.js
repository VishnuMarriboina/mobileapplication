import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const TripsSlice = createSlice({
    // state is decleared and managements of the state and these key and values are used in the app and update in tha app.
    name: "Trips",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },

    // Actios(functions) are the here this are trigger with the help of dispatch 
    // All the actios are binded in the reducer(object) which is an object
    reducers: {
        tripStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        tripsSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload;

        },
        tripsFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
})

export const { tripStart, tripsSuccess, tripsFailed } = TripsSlice.actions;

export const fetchTripsdata = () => async (dispatch) => {
    dispatch(tripStart());
    try {
        const response = await axios.get("https://fakestoreapi.com/products");
        dispatch(tripsSuccess(response.data));
    } catch (error) {
        dispatch(tripsFailed("Failed to fetch traips data"));
    }

};


export default TripsSlice.reducer;



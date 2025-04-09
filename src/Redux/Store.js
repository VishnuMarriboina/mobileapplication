import { configureStore } from "@reduxjs/toolkit";
import TripsSlice from "./Slices/TripsSlice";
import AuthSlice from './Slices/AuthSlice'
import DriverSlice from './Slices/DriverSlice'

export const store = configureStore({
    reducer: {
        Tripsdata: TripsSlice,
        Authdata: AuthSlice,
        Driverdata: DriverSlice,
    }

})


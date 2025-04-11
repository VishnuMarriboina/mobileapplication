// import { configureStore } from "@reduxjs/toolkit";
// import TripsSlice from "./Slices/TripsSlice";
// import AuthSlice from './Slices/AuthSlice'
// import DriverSlice from './Slices/DriverSlice'

// export const store = configureStore({
//     reducer: {
//         Tripsdata: TripsSlice,
//         Authdata: AuthSlice,
//         Driverdata: DriverSlice,
//     }

// })












// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';

import TripsSlice from './Slices/TripsSlice';
import AuthSlice from './Slices/AuthSlice';
import DriverSlice from './Slices/DriverSlice';

// 1️⃣ Create persist config
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // whitelist: ['Tripsdata', 'Authdata', 'Driverdata'], // Only these slices will be persisted
    whitelist:['Authdata'],
};

// 2️⃣ Combine reducers
const rootReducer = combineReducers({
    Tripsdata: TripsSlice,
    Authdata: AuthSlice,
    Driverdata: DriverSlice,
});

// 3️⃣ Wrap root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4️⃣ Create store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Required for redux-persist to avoid warnings
        }),
});

// 5️⃣ Create persistor
export const persistor = persistStore(store);


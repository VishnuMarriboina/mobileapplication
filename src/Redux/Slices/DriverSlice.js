// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     driverName: "",
//     personalNumber: "",
//     emergencyNumber: "",
//     bloodGroup: "",
//     address: "",
//     status: "",
// };

// const DriverSlice = createSlice({
//     name: "driver",
//     initialState,
//     reducers: {
//         updateDriverDetails: (state, action) => {
//             return { ...state, ...action.payload };
//         },
//         resetDriverDetails: () => initialState,
//     },
// });

// export const { updateDriverDetails, resetDriverDetails } = DriverSlice.actions;
// export default DriverSlice.reducer;





import { createSlice } from "@reduxjs/toolkit";

// //  Initial state definition
// const initialState = {
//   driverName: "",
//   personalNumber: "",
//   emergencyNumber: "",
//   bloodGroup: "",
//   address: "",
//   status: "",
// };

// //  Create the slice
// const DriverSlice = createSlice({
//   name: "driver",
//   initialState,
//   reducers: {
//     //  Explicitly update each field in the driver state
//     updateDriverDetails: (state, action) => {
//       const payload = action.payload;

//       if (payload.driverName !== undefined) {
//         state.driverName = payload.driverName;
//       }

//       if (payload.personalNumber !== undefined) {
//         state.personalNumber = payload.personalNumber;
//       }

//       if (payload.emergencyNumber !== undefined) {
//         state.emergencyNumber = payload.emergencyNumber;
//       }

//       if (payload.bloodGroup !== undefined) {
//         state.bloodGroup = payload.bloodGroup;
//       }

//       if (payload.address !== undefined) {
//         state.address = payload.address;
//       }

//       if (payload.status !== undefined) {
//         state.status = payload.status;
//       }
//     },

//     // Reset all fields to initial state
//     resetDriverDetails: (state) => {
//       state.driverName = "";
//       state.personalNumber = "";
//       state.emergencyNumber = "";
//       state.bloodGroup = "";
//       state.address = "";
//       state.status = "";
//     },
//   },
// });

// //  Export the action creators
// export const { updateDriverDetails, resetDriverDetails } = DriverSlice.actions;

// //  Export the reducer
// export default DriverSlice.reducer;  


const initialState = {
    driverName: "",
    personalNumber: "",
    emergencyNumber: "",
    address: "",
    bloodGroup: null,
    status: null,
  };
  
  const driverSlice = createSlice({
    name: 'driver',
    initialState,
    reducers: {
      updateDriverDetails: (state, action) => {
        const {
          driverName,
          personalNumber,
          emergencyNumber,
          address,
          bloodGroup,
          status,
        } = action.payload;
  
        state.driverName = driverName;
        state.personalNumber = personalNumber;
        state.emergencyNumber = emergencyNumber;
        state.address = address;
        state.bloodGroup = bloodGroup;
        state.status = status;
      },
    },
  });
  
  export const { updateDriverDetails } = driverSlice.actions;
  export default driverSlice.reducer;
  

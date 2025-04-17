// import { createSlice } from "@reduxjs/toolkit";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const initialState = {
//   driverName: "",
//   personalNumber: "",
//   emergencyNumber: "",
//   address: "",
//   bloodGroup: null,
//   status: null,
//   experienceInYears: "",
//   isNewUser:true,
// };

// const driverSlice = createSlice({
//   name: 'driver',
//   initialState,
//   reducers: {
//     updateDriverDetails: (state, action) => {
//       const {
//         driverName,
//         personalNumber,
//         emergencyNumber,
//         address,
//         bloodGroup,
//         status,
//         experienceInYears,
//       } = action.payload;

//       state.driverName = driverName;
//       state.personalNumber = personalNumber;
//       state.emergencyNumber = emergencyNumber;
//       state.address = address;
//       state.experienceInYears = experienceInYears;
//       state.bloodGroup = bloodGroup;
//       state.status = status;
//     },
//   },
// });

// export const { updateDriverDetails } = driverSlice.actions;
// export default driverSlice.reducer;







import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// AsyncThunk for posting driver details
export const postDriverDetails = createAsyncThunk(
  'driver/postDriverDetails',
  async (driverData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://your-api-endpoint.com/driver', driverData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  driverName: "",
  personalNumber: "",
  emergencyNumber: "",
  address: "",
  bloodGroup: null,
  status: null,
  experienceInYears: "",
  isNewUser: true,
  loading: false,
  error: null,
  success: false,
};

const driverSlice = createSlice({
  name: "driver",
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
        experienceInYears,
      } = action.payload;

      state.driverName = driverName;
      state.personalNumber = personalNumber;
      state.emergencyNumber = emergencyNumber;
      state.address = address;
      state.experienceInYears = experienceInYears;
      state.bloodGroup = bloodGroup;
      state.status = status;
    },
    resetDriverStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postDriverDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(postDriverDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Optional: update state with response data if needed
      })
      .addCase(postDriverDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { updateDriverDetails, resetDriverStatus } = driverSlice.actions;
export default driverSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CURRENCY_NAME_TO_CODE from "./money";
const API_KEY = "6f558f213631d8e5e1892fcf231a1987";
const BASE_URL = "https://api.exchangerate.host";


const initialState = {
  data: null,
  status: 'idle',
  CURRENCY_NAME_TO_CODE,
  moneyNumber:0,
  countryName:"",
  toCountryName:"",
 check:false
};

export const moneyfetch = createAsyncThunk("currency/convert", async ({ countryName, toCountryName, moneyNumber }) => {
  const endpoint = `/convert`;
  const url = `${BASE_URL}${endpoint}?from=${countryName}&to=${toCountryName}&amount=${moneyNumber}&access_key=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("API isteği başarısız oldu.");
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    throw error; 
  }
});
const fetchSlice = createSlice({
  name: "cooks",
  initialState,
  reducers: {
    changeNumber: (state, action) => {
      state.moneyNumber = action.payload;
    },
    counterName: (state, action) => {
      state.countryName = action.payload;
    },
    toCountry: (state, action) => {
      state.toCountryName = action.payload;
    },
    sendConvert: (state) => {
      state.check = !state.check; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(moneyfetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(moneyfetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.check = false;
        console.log(state.data)
      })
      .addCase(moneyfetch.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { changeNumber, counterName, toCountry, sendConvert } = fetchSlice.actions;
export default fetchSlice.reducer;
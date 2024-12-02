import { configureStore } from "@reduxjs/toolkit";
import fetchReducer from "./features/fetch"
export const store = configureStore({
reducer:{
fetch:fetchReducer

}


})

import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./";

//el store hay que colocarlo en una parte "alta" de la aplicación (CalendarApp
export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        //calendar: calendarSlice.reducer,
    },
})
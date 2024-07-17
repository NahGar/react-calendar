
import { configureStore } from "@reduxjs/toolkit";
import { calendarSlice, uiSlice } from "./";

//el store hay que colocarlo en una parte "alta" de la aplicación (CalendarApp)
export const store = configureStore({
    reducer: {
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer,
    },
    //esta config es para que no de error con las fechas como string
    //otra solución es usar las fechas como número
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});
import { createSlice } from '@reduxjs/toolkit';
//import { addHours } from 'date-fns';

/*
const tempEvent = {
    id: new Date().getTime(),
    title: 'Cumpleaños de Pepe',
    notes: 'Hay que comprar el pastel',
    start: new Date(),
    end: addHours( new Date(), 1 ),
    bgColor: '#fafafa',
    user: {
        _id: '1',
        name: 'user'
    }
};
*/

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [ /*tempEvent*/ ],
        activeEvent: null,
    },
    reducers: {
        onSetActiveEvent: ( state, { payload } ) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: ( state, { payload } )  => {
            state.events.push( payload );
            state.activeEvent = null;
        },
        onUpdateEvent: ( state, { payload } )  => {

            state.events = state.events.map( ( event ) => {
                if( event.id === payload.id ) {
                    return payload;
                }
                else {
                    return event;
                }
            });
            state.activeEvent = null;
        },
        onDeleteEvent: ( state )  => {
            if( state.activeEvent ) {
                state.events = state.events.filter( event => event.id !== state.activeEvent.id );
                state.activeEvent = null;
            }
        },
        onLoadEvents: ( state, { payload = [] } ) => {
            state.isLoadingEvents = false;
            //state.events = payload;
            payload.forEach( event => {
                //si encuentra un elemento que cumple la condición regresa true
                const exists = state.events.some( dbEvent => dbEvent.id === event.id );
                if( !exists ) {
                    state.events.push( event );
                }
            });
        }
    },
});

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } = calendarSlice.actions;
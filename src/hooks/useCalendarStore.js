import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";
import { calendarApi } from "../api";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( event ) => {

        dispatch( onSetActiveEvent( event ) );
    }

    const startSavingEvent = async ( event ) => {

        if( event._id ) { //update
            dispatch( onUpdateEvent( { ...event } ) );
        }
        else { //insert
            
            const { data } = await calendarApi.post('/events', event );
            
            //event._id = new Date().getTime();
            event.id = data.event.id;
            event.bgColor = '#fafafa';
            event.user = user;

            dispatch( onAddNewEvent( event ) );
        }
    }

    const startDeletingEvent = async () => {
        dispatch( onDeleteEvent() );
    }

    const startLoadingEvents = async () => {

        try {
            const { data } = await calendarApi.get('/events', event );
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }


    return {
        //Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //Metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
    }
}
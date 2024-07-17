import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar );

    const setActiveEvent = ( event ) => {

        dispatch( onSetActiveEvent( event ) );
    }

    const startSavingEvent = async ( event ) => {

        if( event._id ) { //update
            dispatch( onUpdateEvent( { ...event } ) );
        }
        else { //insert

            event._id = new Date().getTime();
            event.bgColor = '#fafafa';
            event.user = { _id: '1', name: 'user' };

            dispatch( onAddNewEvent( event ) );
        }
    }

    const startDeletingEvent = async () => {
        dispatch( onDeleteEvent() );
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
    }
}
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onLoadEvents } from "../store";
import { calendarApi } from "../api";
import { convertEventStrToEventDate } from "../helpers";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( event ) => {

        dispatch( onSetActiveEvent( event ) );
    }

    const startSavingEvent = async ( event ) => {

        try {
            
            if( event.id ) { //update
    
                await calendarApi.put('/events/' + event.id, event);
    
                dispatch( onUpdateEvent( { ...event, user } ) );

                Swal.fire('',"Modificación exitosa",'success');
            }
            else { //insert
                
                const { data } = await calendarApi.post('/events', event );
                
                //event.id = new Date().getTime();
                event.id = data.event.id;
                event.bgColor = '#fafafa';
                event.user = user;
    
                dispatch( onAddNewEvent( event ) );

                Swal.fire('',"Creación exitosa",'success');
            }

        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar',error.response.data.msg,'error');
        }
        
    }

    const startDeletingEvent = async () => {

        try {
            await calendarApi.delete('/events/' + activeEvent.id );

            dispatch( onDeleteEvent() );

            Swal.fire('',"Eliminación exitosa",'success');

        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar',error.response.data.msg,'error');
        }
    }

    const startLoadingEvents = async () => {

        try {
            const { data } = await calendarApi.get('/events');

            const events = convertEventStrToEventDate( data.events );
            
            // corrige diferencia de event.user._id en carga y event.user.uid en creación
            const eventsUpdated = events.map( (event) => {
                return {
                    ...event,
                    user: {
                        uid: event.user._id,
                        name: event.user.name,
                    }
                };
            });
            
            dispatch ( onLoadEvents( eventsUpdated ) );

        } catch (error) {
            console.log(error);
            Swal.fire('Error al cargar los eventos',error.response.data.msg,'error');
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
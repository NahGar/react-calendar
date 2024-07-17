import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../";
import { localizer, getMessagesES } from '../../helpers';
import { useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {

    const { events, setActiveEvent } = useCalendarStore();    
    const { openDateModal } = useUiStore();

    const [lastView, setLastView] = useState(localStorage.getItem('calendarLastView') || 'week');
    
    const eventStyleGetter = ( event, start, end, isSelected ) => {
        if ( isSelected ){
            return {
                style: {
                    backgroundColor: 'yellow', borderRadius: '0px', opacity: 0.8, color: 'black'
                }
            }    
        }
        else {
            return {
                style: {
                    backgroundColor: 'navy', borderRadius: '0px', opacity: 0.8, color: 'white'
                }
            }
        }
    }

    const onDoubleClick = ( event ) => {
        openDateModal();
    }

    const onSelect = ( event ) => {
        setActiveEvent( event );
    }

    const onViewChanged = ( event ) => {
        localStorage.setItem('calendarLastView',event);
        //no es necesario
        setLastView( event );
    }

    return (
        <>
            <Navbar />
            
            <Calendar
                culture='es'
                localizer={ localizer }
                events={ events }
                defaultView={ lastView }
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 100px)'}}
                messages={ getMessagesES() }
                eventPropGetter={ eventStyleGetter }
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChanged }
            />

            <CalendarModal />
            <FabAddNew />
            <FabDelete />
  
        </>
    )
}

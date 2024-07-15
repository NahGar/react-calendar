import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours } from 'date-fns';
import { CalendarEvent, CalendarModal, Navbar } from "../";
import { localizer, getMessagesES } from '../../helpers';
import { useUiStore } from '../../hooks';

const events = [{
    title: 'Cumpleaños de Pepe',
    notes: 'Hay que comprar el pastel',
    start: new Date(),
    end: addHours( new Date(), 1 ),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Fernando'
    }
}];

export const CalendarPage = () => {

    const { openDateModal } = useUiStore();

    const [lastView, setLastView] = useState(localStorage.getItem('calendarLastView') || 'week');

    const eventStyleGetter = ( event, start, end, isSelected ) => {

        const style = {
            backgroundColor: '#347CF7',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return { style };
    }

    const onDoubleClick = ( event ) => {
        openDateModal();
    }

    const onSelect = ( event ) => {
        
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
  
        </>
    )
}

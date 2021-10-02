import {useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment';
import 'moment/locale/es';

/* Importaciones propias */
import {Navbar} from '../ui/Navbar';
import {AddNewFab} from '../ui/AddNewFab';
import {DeleteEventFab} from '../ui/DeleteEventFab';
import {messages} from '../../helpers/calendar-messages-es';
import {CalendarEvent} from './CalendarEvent';
import {CalendarModal} from './CalendarModal';
import {uiOpenModal} from '../../actions/ui';
import {eventClearActiveEvent, eventSetActive} from '../../actions/events';

/* Importacion del estilo de BigCalendar */
import 'react-big-calendar/lib/css/react-big-calendar.css';

/* Configuración del idioma de moment */
moment.locale('es');

/* Configuración de react big calendar */
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
    /* dispatch de Redux */
    const dispatch = useDispatch();

    /* Leer eventos del Store */
    const {events, activeEvent} = useSelector(state => state.calendar);
    // console.log(events);

    /* Estado de la última vista */
    const [lasView, setLastView] = useState(localStorage.getItem('last-view') || 'month');

    /* Evento al hacer doble click */
    const onDoubleClick = (e) => {
        // console.log(e);
        dispatch(uiOpenModal());
    }

    /* Evento al seleccionar el evento */
    const onSelectEvent = (e) => {
        // console.log(e);
        dispatch(eventSetActive(e));
    }

    /* Evento para seleccionar la vista */
    const onViewChange = (e) => {
        // console.log(e);

        /* Actualizar y guardar la última vista en el localStorage */
        setLastView(e);
        localStorage.setItem('last-view', e);
    }

    /* Evento para seleccionar un slot del calendar */
    const onSelectSlot = (e) => {
        // console.log(e);
        dispatch(eventClearActiveEvent());
    }

    /* Evento para dar estilos a la nota */
    const eventStyleGetter = (event, start, end, isSelected) => {
        // console.log(event, start, end, isSelected);
        return {
            style: {
                backgroundColor: '#367CF7',
                borderRadius: '0px',
                opacity: 0.8,
                display: 'block',
                color: 'white'
            }
        }
    }

    return (
        <div className="calendar-screen">
            <Navbar/>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                selectable={true}
                view={lasView}
                components={{
                    event: CalendarEvent
                }}/>

            <AddNewFab/>

            {
                (activeEvent) && (
                    <DeleteEventFab/>
                )
            }

            <CalendarModal/>
        </div>
    )
}
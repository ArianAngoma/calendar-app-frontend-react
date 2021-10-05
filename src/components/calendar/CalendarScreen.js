import {useEffect, useState} from 'react';

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
import {uiOpenModal, uiOpenModalWithSlotCalendar} from '../../actions/ui';
import {eventClearActiveEvent, eventSetActive, eventStartLoading} from '../../actions/events';

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
    /* Leer usuario del Store */
    const {uid} = useSelector(state => state.auth);

    /* Estado de la última vista */
    const [lasView, setLastView] = useState(localStorage.getItem('last-view') || 'month');

    /* Efecto para obtener todos los eventos al cargar el componente */
    useEffect(() => {
        dispatch(eventStartLoading());
    }, [dispatch]);

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

        /* Limpiar actievent */
        if (activeEvent) return dispatch(eventClearActiveEvent());

        /* Abrir modal con fecha selecionada en el calendar */
        dispatch(uiOpenModalWithSlotCalendar(e.start, e.end));
    }

    /* Evento para dar estilos a la nota */
    const eventStyleGetter = (event, start, end, isSelected) => {
        // console.log(event, start, end, isSelected);
        return {
            style: {
                backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
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
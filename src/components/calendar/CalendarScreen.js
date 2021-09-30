import {useState} from "react";

import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment';
import 'moment/locale/es';

/* Importaciones propias */
import {Navbar} from "../ui/Navbar";
import {messages} from "../../helpers/calendar-messages-es";
import {CalendarEvent} from "./CalendarEvent";
import {CalendarModal} from "./CalendarModal";

/* Importacion del estilo de BigCalendar */
import 'react-big-calendar/lib/css/react-big-calendar.css';

/* Configuración del idioma de moment */
moment.locale('es');

/* Configuración de react big calendar */
const localizer = momentLocalizer(moment);

/* Lista de eventos */
const events = [{
    title: 'Cumpleaños de Arian',
    start: moment().toDate(), // new Date()
    end: moment().add(2, 'hours').toDate(),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Angoma'
    }
}]

export const CalendarScreen = () => {
    const [lasView, setLastView] = useState(localStorage.getItem('last-view') || 'month');

    /* Evento al hacer doble click */
    const onDoubleClick = (e) => {
        console.log(e);
    }

    /* Evento al seleccionar el evento */
    const onSelectEvent = (e) => {
        console.log(e);
    }

    /* Evento para seleccionar la vista */
    const onViewChange = (e) => {
        // console.log(e);

        /* Actualizar y guardar la última vista en el localStorage */
        setLastView(e);
        localStorage.setItem('last-view', e);
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
                view={lasView}
                components={{
                    event: CalendarEvent
                }}/>

            <CalendarModal/>
        </div>
    )
}
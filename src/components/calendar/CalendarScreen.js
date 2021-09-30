import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment';

/* Importaciones propias */
import {Navbar} from "../ui/Navbar";

/* Importacion del estilo de BigCalendar */
import 'react-big-calendar/lib/css/react-big-calendar.css';

/* Configuración de react big calendar */
const localizer = momentLocalizer(moment);

/* Lista de eventos */
const events = [{
    title: 'Cumpleaños de Arian',
    start: moment().toDate(), // new Date()
    end: moment().add(2, 'hours').toDate(),
    bgColor: '#fafafa'
}]

export const CalendarScreen = () => {
    return (
        <div className="calendar-screen">
            <Navbar/>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"/>
        </div>
    )
}
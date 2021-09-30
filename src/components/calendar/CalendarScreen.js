import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment';
import 'moment/locale/es';

/* Importaciones propias */
import {Navbar} from "../ui/Navbar";
import {messages} from "../../helpers/calendar-messages-es";

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
    bgColor: '#fafafa'
}]

export const CalendarScreen = () => {
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
                eventPropGetter={eventStyleGetter}/>
        </div>
    )
}
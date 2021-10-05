import moment from 'moment';

/* Función para convertir el string date a objetos tipo Date */
export const prepareEvent = (events) => {
    return events.map(event => ({
        ...event,
        start: moment(event.start).toDate(),
        end: moment(event.end).toDate()
    }))
}
import moment from 'moment';
import {types} from '../types/types';

const initialState = {
    events: [{
        id: new Date().getTime(),
        title: 'Cumpleaños de Arian',
        start: moment().toDate(), // new Date()
        end: moment().add(2, 'hours').toDate(),
        bgColor: '#fafafa',
        notes: 'Comprar pastel',
        user: {
            _id: '123',
            name: 'Angoma'
        }
    }],
    activeEvent: null
}

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        /* Activar el evento */
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
        /* Limpiar evento activo */
        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }
        /* Agregar un nuevo evento al state */
        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }
        /* Actualizar evento */
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(
                    event => (event.id === action.payload.id) ? action.payload : event
                )
            }
        default:
            return state;
    }
}
import {types} from '../types/types';

/*{
    id: idMongoDB,
    title: 'Cumpleaños de Arian',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    notes: 'Comprar pastel',
    user: {
        _id: '123',
        name: 'Angoma'
    }
}*/

const initialState = {
    events: [],
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
        /* Eliminar evento */
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(
                    event => (event.id !== state.activeEvent.id)
                ),
                activeEvent: null
            }
        /* Cargar eventos */
        case types.eventLoaded:
            return {
                ...state,
                events: [...action.payload]
            }
        /* Limpiar store de calendar hacer logout */
        case types.eventLogout:
            return {
                ...initialState
            }
        default:
            return state;
    }
}
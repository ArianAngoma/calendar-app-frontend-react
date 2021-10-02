/* Importaciones propias */
import {types} from '../types/types';

/* Estado inicial */
const initialState = {
    modalOpen: false
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        /* Abrir el modal */
        case types.uiOpenModal:
            delete state.startDate;
            delete state.endDate;
            return {
                ...state,
                modalOpen: true
            }

        /* Abrir el modal si se hace click en un slot del calendar */
        case types.uiOpenModalWithSlotCalendar:
            return {
                ...state,
                modalOpen: true,
                startDate: action.payload.start,
                endDate: action.payload.end
            }

        /* Cerrar el modal */
        case types.uiCloseModal:
            delete state.startDate;
            delete state.endDate;
            return {
                ...state,
                modalOpen: false
            }
        default:
            return state;
    }
}
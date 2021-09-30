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
            return {
                ...state,
                modalOpen: true
            }

        /* Cerrar el modal */
        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false
            }
        default:
            return state;
    }
}
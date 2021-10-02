import {types} from '../types/types';

/* Abrir modal */
export const uiOpenModal = () => ({
    type: types.uiOpenModal
});

/* Abrir modal con las fechas cargadas */
export const uiOpenModalWithSlotCalendar = (start, end) => ({
    type: types.uiOpenModalWithSlotCalendar,
    payload: {
        start,
        end
    }
});

/* Cerrar modal */
export const uiCloseModal = () => ({
    type: types.uiCloseModal
});
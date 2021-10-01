/* Importaciones propias */
import {types} from '../types/types';

/* Activar la nota del state calendar.events */
export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

/* Agregar nueva nota al state de calendar.events */
export const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

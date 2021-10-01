/* Importaciones propias */
import {types} from '../types/types';

/* Agregar nueva nota al state de calendar.events */
export const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

/* Activar la nota del state calendar.events */
export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});
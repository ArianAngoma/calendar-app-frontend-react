/* Importaciones propias */
import {types} from '../types/types';
import {fetchWithToken} from '../helpers/fetch';

/* Activar la nota del state calendar.events */
export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

/* Limpiar evento activo */
export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
});

/* Iniciar el proceso de agregar un nuevo evento */
export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {
        // console.log(event);
        const {uid, name} = getState().auth;

        try {
            const resp = await fetchWithToken('events', event, 'POST');
            const data = await resp.json();
            // console.log(data);
            if (data.ok) {
                event.id = data.event.id;
                event.user = {
                    _id: uid,
                    name
                };
                dispatch(eventAddNew(event));
            }
        } catch (e) {
            console.log(e);
        }
    }
}

/* Agregar nueva nota al state de calendar.events */
export const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

/* Actualizar evento */
export const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});

/* Eliminar Evento */
export const eventDeleted = () => ({
    type: types.eventDeleted
});
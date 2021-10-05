import Swal from 'sweetalert2';

/* Importaciones propias */
import {types} from '../types/types';
import {fetchWithToken} from '../helpers/fetch';
import {prepareEvent} from '../helpers/prepare-event';

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

/* Inicia la actualización del evento a la DB */
export const eventStartUpdate = (event) => {
    return async (dispatch) => {
        try {
            // console.log(event);
            const resp = await fetchWithToken(`events/${event.id}`, event, 'PUT');
            const data = await resp.json();
            // console.log(data);
            if (data.ok) {
                dispatch(eventUpdated(event));
            } else {
                if (data.msg) Swal.fire('Error', data.msg, 'error');
                else {
                    for (const error in data.errors) {
                        // console.log(data.errors[error].msg)
                        Swal.fire('Error', data.errors[error].msg, 'error');
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
}

/* Actualizar evento */
export const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});

/* Eliminar Evento */
export const eventDeleted = () => ({
    type: types.eventDeleted
});

/* Obtener todos los eventos de la base de datos */
export const eventStartLoading = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithToken('events');
            const data = await resp.json();
            // console.log(data);

            const events = prepareEvent(data.events);
            // console.log(events)
            dispatch(eventLoaded(events));
        } catch (e) {
            console.log(e);
        }
    }
}

/* Editar el store de los eventos */
export const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})

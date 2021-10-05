/* Importaciones propias */
import {fetchNoToken} from '../helpers/fetch';
import {types} from '../types/types';
import {saveDataUser} from '../helpers/save-data-user';

/* acción para el inicio del login  */
export const startLogin = (email, password) => {
    return async (dispatch) => {
        const resp = await fetchNoToken('auth', {email, password}, 'POST');
        const data = await resp.json();
        // console.log(data);

        saveDataUser(data, dispatch);
    }
}

/* Acción para el inicio del Registro */
export const startRegister = (email, password, name) => {
    return async (dispatch) => {
        /* Generar color random para el calendario */
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

        const resp = await fetchNoToken('auth/register', {email, password, name, color: randomColor}, 'POST');
        const data = await resp.json();
        // console.log(data);

        saveDataUser(data, dispatch);
    }
}

export const login = (user) => ({
    type: types.authLogin,
    payload: user
});
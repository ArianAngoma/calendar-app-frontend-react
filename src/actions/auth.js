/* Importaciones propias */
import {fetchNoToken, fetchWithToken} from '../helpers/fetch';
import {types} from '../types/types';
import {saveDataUser} from '../helpers/save-data-user';

/* acción para el inicio del login  */
export const startLogin = (email, password) => {
    return async (dispatch) => {
        const resp = await fetchNoToken('auth', {email, password}, 'POST');
        const data = await resp.json();
        // console.log(data);

        await saveDataUser(data, dispatch);
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

        await saveDataUser(data, dispatch);
    }
}

/* Acción para validar el TOKEN */
export const startChecking = () => {
    return async (dispatch) => {
        const resp = await fetchWithToken('auth/renew-token');
        const data = await resp.json();
        // console.log(data);

        if (data.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            /* Acción al login */
            dispatch(login({
                uid: data.uid,
                name: data.name,
                color: data.color
            }));
        } else {
            dispatch(checkingFinish());
        }
    }
}

/* Acción para finalizar la carga si el usuario esta logueado */
export const checkingFinish = () => ({
    type: types.authCheckingFinish
});

/* Acción para editar el store con el usuario logueado */
export const login = (user) => ({
    type: types.authLogin,
    payload: user
});

/* Inicio del Logout - limpiar el localStorage */
export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();

        dispatch(logout());
    }
}

/* Logout del usuario */
export const logout = () => ({
    type: types.authLogout
})
/* Importaciones propias */
import {fetchNoToken} from '../helpers/fetch';
import {types} from '../types/types';

/* acción para el inicio del login  */
export const startLogin = (email, password) => {
    return async (dispatch) => {
        const resp = await fetchNoToken('auth', {email, password}, 'POST');
        const {ok, user} = await resp.json();
        // console.log(data);

        if (ok) {
            localStorage.setItem('x-token', user.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            /* Accion al login */
            dispatch(login({
                uid: user.uid,
                name: user.name,
                color: user.color
            }))
        }
    }
}

const login = (user) => ({
    type: types.authLogin,
    payload: user
});
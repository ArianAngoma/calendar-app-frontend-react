import Swal from 'sweetalert2';

/* Importaciones propias */
import {login} from '../actions/auth';

export const saveDataUser = (data, dispatch) => {
    if (data.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('token-init-date', new Date().getTime());

        /* Acción al login */
        dispatch(login({
            uid: data.uid,
            name: data.name
        }));
    } else {
        if (data.msg) Swal.fire('Error', data.msg, 'error');
        else {
            for (const error in data.errors) {
                // console.log(data.errors[error].msg)
                Swal.fire('Error', data.errors[error].msg, 'error');
            }
        }
    }
}
import Swal from 'sweetalert2';

/* Importaciones propias */
import {login} from '../actions/auth';

export const saveDataUser = (data, dispatch) => {
    if (data.ok) {
        localStorage.setItem('x-token', data.user.token);
        localStorage.setItem('token-init-date', new Date().getTime());

        /* Acción al login */
        dispatch(login({
            uid: data.user.uid,
            name: data.user.name,
            color: data.user.color
        }));
    } else {
        if (data.msg) return Swal.fire('Error', data.msg, 'error');
        else {
            for (const error in data.errors) {
                // console.log(data.errors[error].msg)
                Swal.fire('Error', data.errors[error].msg, 'error');
            }
        }
    }
}
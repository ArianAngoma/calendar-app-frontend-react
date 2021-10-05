/* Importaciones propias */
import {types} from '../types/types';

const initialState = {
    checking: true,
    // uid: null,
    // name: null,
    // color: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        /* Guardar usuario en el store */
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking: false
            }
        /* Cambiar el store auth en finalizado si el usuario esta loguedo */
        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }
        /* Logout del usuario - limpiar el store */
        case types.authLogout:
            return {
                checking: false
            }
        default:
            return state;
    }
}
/* Importaciones propias */
import {authReducer} from '../../reducers/authReducer';
import {login} from '../../actions/auth';
import {types} from '../../types/types';

const initialState = {
    checking: true,
    // uid: null,
    // name: null
}

describe('Pruebas en reducer authReducer', () => {
    test('Debe de retornar el state por defecto', () => {
        const state = authReducer(initialState, {});
        expect(state).toEqual(initialState);
    });

    test('Debería de guardar el usuario en el store al hacer SignIn', () => {
        const action = {
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'Arian'
            }
        }
        const state = authReducer(initialState, action);
        expect(state).toEqual({...initialState, checking: false, uid: '123', name: 'Arian'});
    });
});
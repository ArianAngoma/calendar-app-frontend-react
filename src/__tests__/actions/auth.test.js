import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

/* Importaciones propias */
import {startLogin, startRegister} from '../../actions/auth';
import {types} from '../../types/types';
import * as fetchModule from '../../helpers/fetch';

/* Mock para el sweetalert2 */
jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

/* Configuración del Store */
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

/* Estado inicial del Store */
const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

describe('Pruebas en las acciones Auth', () => {
    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    test('Debería de hacer la acción startLogin correctamente', async () => {
        await store.dispatch(startLogin('test1@gmail.com', '123456'));
        const actions = store.getActions();
        // console.log(actions);
        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

        /* Obtener los datos del localStorage */
        // console.log(localStorage.setItem.mock.calls);
        // console.log(localStorage.setItem.mock.calls[0][1]);
    });

    test('Debería de hacer la acción startLogin incorrecto', async () => {
        /* Password incorrecto */
        await store.dispatch(startLogin('test1@gmail.com', 'error'));
        let actions = store.getActions();
        // console.log(actions);
        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalled();
        expect(Swal.fire).toHaveBeenCalledWith("Error", "Password incorrecto", "error");

        /* Email incorrecto */
        await store.dispatch(startLogin('error@gmail.com', '123456'));
        actions = store.getActions();
        // console.log(actions);
        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalled();
        expect(Swal.fire).toHaveBeenCalledWith("Error", "No existe usuario con el email error@gmail.com", "error");
    });

    test('Debería de hacer la acción startRegister correctamente', async () => {
        /* Mock del fetchNoToken */
        fetchModule.fetchNoToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'Arian Angoma Vilchez',
                    token: '123123123123'
                }
            }
        }));

        await store.dispatch(startRegister('test@test.com', '123456', 'test'));
        const actions = store.getActions();
        console.log(actions);
        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'Arian Angoma Vilchez'
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', '123123123123');
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
    });
});
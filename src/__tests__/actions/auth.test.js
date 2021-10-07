import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

/* Importaciones propias */
import {startLogin} from '../../actions/auth';
import {types} from '../../types/types';

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
});
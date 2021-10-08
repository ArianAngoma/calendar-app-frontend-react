import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

/* Importaciones propias */
import {LoginScreen} from '../../../components/auth/LoginScreen';
import {startLogin, startRegister} from '../../../actions/auth';

/* Mock para la acción eventStartDelete */
jest.mock('../../../actions/auth', () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn()
}));

/* Mock para el Swal */
jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

/* Configuración del Store */
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

/* Estado inicial del Store */
const initState = {};
let store = mockStore(initState);

/* Mock del store */
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <LoginScreen/>
    </Provider>
)

describe('Pruebas en el componente <LoginScreen/>', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debería de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debería de llamar el dispatch del login', () => {
        wrapper.find('input[name="loginEmail"]').simulate('change', {
            target: {
                name: 'loginEmail',
                value: 'test@gmail.com'
            }
        });

        wrapper.find('input[name="loginPassword"]').simulate('change', {
            target: {
                name: 'loginPassword',
                value: '123456'
            }
        });

        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault() {
            }
        });

        expect(startLogin).toHaveBeenCalledWith('test@gmail.com', '123456');
    });

    test('Debería de no hacer el registro si password son diferentes', () => {
        wrapper.find('input[name="registerPassword1"]').simulate('change', {
            target: {
                name: 'registerPassword1',
                value: ':D:D:D:D:D'
            }
        });

        wrapper.find('input[name="registerPassword2"]').simulate('change', {
            target: {
                name: 'registerPassword2',
                value: 'D:D:D:D:D:'
            }
        });

        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault() {
            }
        });

        // expect(startRegister).toHaveBeenCalledTimes(0);
        expect(startRegister).not.toHaveBeenCalled();
        expect(Swal.fire).toHaveBeenCalled();
        expect(Swal.fire).toHaveBeenCalledWith("Error", "Las contraseñas deben de ser iguales", "error");
    });

    test('Debería de disparar el registro con passwords iguales', () => {
        wrapper.find('input[name="registerPassword1"]').simulate('change', {
            target: {
                name: 'registerPassword1',
                value: '123456'
            }
        });

        wrapper.find('input[name="registerPassword2"]').simulate('change', {
            target: {
                name: 'registerPassword2',
                value: '123456'
            }
        });

        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault() {
            }
        });

        expect(Swal.fire).not.toHaveBeenCalled();
        expect(startRegister).toHaveBeenCalledWith("", "123456", "");
    });
});
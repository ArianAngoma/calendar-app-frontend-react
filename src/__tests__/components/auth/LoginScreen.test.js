import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

/* Importaciones propias */
import {LoginScreen} from '../../../components/auth/LoginScreen';
import {startLogin} from '../../../actions/auth';

/* Mock para la acción eventStartDelete */
jest.mock('../../../actions/auth', () => ({
    startLogin: jest.fn()
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
});
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

/* Importaciones propias */
import {AppRouter} from '../../router/AppRouter';

/* Configuración del Store */
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Pruebas en <AppRouter/>', () => {
    test('Debería de mostrar el Loading', () => {
        /* Estado inicial del Store */
        const initState = {
            auth: {
                checking: true
            }
        };
        let store = mockStore(initState);

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter/>
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('Debería de mostrar la ruta pública', () => {
        /* Estado inicial del Store */
        const initState = {
            auth: {
                checking: false,
                uid: null
            }
        };
        let store = mockStore(initState);

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter/>
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.login-container').exists()).toBe(true);
    });

    test('Debería de mostrar la ruta privada', () => {
        /* Estado inicial del Store */
        const initState = {
            auth: {
                checking: false,
                uid: 123,
                name: 'Arian'
            },
            calendar: {
                events: []
            },
            ui: {
                modalOpen: false
            }
        };
        let store = mockStore(initState);

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter/>
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.calendar-screen').exists()).toBe(true);
    });
});
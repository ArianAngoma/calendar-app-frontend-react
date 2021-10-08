import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

/* Importaciones propias */
import {CalendarScreen} from '../../../components/calendar/CalendarScreen';

/* Mock para la acción eventStartDelete */
/*jest.mock('../../../actions/events', () => ({
    eventStartDelete: jest.fn()
}));*/

/* Configuración del Store */
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

/* Estado inicial del Store */
const initState = {
    calendar: {
        events: []
    },
    auth: {
        checking: false,
        uid: '123',
        name: 'Arian'
    },
    ui: {
        modalOpen: false
    }
};
let store = mockStore(initState);

/* Mock del store */
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarScreen/>
    </Provider>
)

describe('Pruebas en el componente <CalendarScreen/>', () => {
    test('Debería de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
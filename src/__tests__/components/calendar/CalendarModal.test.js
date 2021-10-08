import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';

/* Importaciones propias */
import {CalendarModal} from '../../../components/calendar/CalendarModal';

/* Configuración del Store */
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

/* Fecha inicial */
const now = moment().minutes(0).seconds(0).add(1, 'hours');
/* Fecha final */
const end = now.clone().add(1, 'hours');

/* Estado inicial del Store */
const initState = {
    calendar: {
        events: [],
        activeEvent: {
            title: 'Hola Mundo',
            notes: 'Notas',
            start: now.toDate(),
            end: end.toDate()
        }
    },
    auth: {
        checking: false,
        uid: '123',
        name: 'Arian'
    },
    ui: {
        modalOpen: true
    }
};
let store = mockStore(initState);

/* Mock del store */
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarModal/>
    </Provider>
)

describe('Pruebas en el componente <CalendarModal/>', () => {
    test('Debería de mostrar el modal', () => {
        // expect(wrapper.find('.modal').exists()).toBe(true);
        expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
    });
});
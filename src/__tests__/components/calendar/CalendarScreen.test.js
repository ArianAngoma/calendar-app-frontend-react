import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {act} from '@testing-library/react';

/* Importaciones propias */
import {CalendarScreen} from '../../../components/calendar/CalendarScreen';
import {messages} from '../../../helpers/calendar-messages-es';
import {types} from '../../../types/types';
import {eventSetActive} from '../../../actions/events';

/* Mock para la acción eventSetActive */
jest.mock('../../../actions/events', () => ({
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn()
}));

/* Mock para el localStorage */
Storage.prototype.setItem = jest.fn();

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

    test('Debería de ejecutar correctamente las interacciones del calendario', () => {
        const calendar = wrapper.find('Calendar');

        const calendarMessages = calendar.prop('messages');
        // console.log(calendarMessages);
        expect(calendarMessages).toEqual(messages);

        calendar.prop('onDoubleClickEvent')();
        expect(store.dispatch).toHaveBeenLastCalledWith({type: types.uiOpenModal});

        calendar.prop('onSelectEvent')({start: 'Hello World'});
        expect(eventSetActive).toHaveBeenLastCalledWith({start: 'Hello World'});

        act(() => {
            calendar.prop('onView')('week');
            expect(localStorage.setItem).toHaveBeenLastCalledWith("last-view", "week");
        });
    });
});
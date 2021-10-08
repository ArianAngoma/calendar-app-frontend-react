import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

/* Importaciones propias */
import {DeleteEventFab} from '../../../components/ui/DeleteEventFab';
import {eventStartDelete} from '../../../actions/events';

/* Mock para la acción eventStartDelete */
jest.mock('../../../actions/events', () => ({
    eventStartDelete: jest.fn()
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
        <DeleteEventFab/>
    </Provider>
)

describe('Pruebas en el componente <DeleteEventFab/>', () => {
    test('Debería de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debería de llamar el evento handleDelete hacer click', () => {
        /* Simular click */
        wrapper.find('button').prop('onClick')();
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(eventStartDelete).toHaveBeenCalled();
    });
});
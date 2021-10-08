import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

/* Importaciones propias */
import {DeleteEventFab} from '../../../components/ui/DeleteEventFab';

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
});
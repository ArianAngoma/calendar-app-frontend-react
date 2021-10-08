/* Importaciones propias */
import {uiReducer} from '../../reducers/uiReducer';
import {uiCloseModal, uiOpenModal} from '../../actions/ui';

const initialState = {
    modalOpen: false
}

describe('Pruebas en reducer authReducer', () => {
    test('Dbería de retornar el state por defecto', () => {
        const state = uiReducer(initialState, {});
        expect(state).toEqual(initialState);
    });

    test('Debería de abrir y cerrar el modal', () => {
        const modalOpen = uiOpenModal();
        const state = uiReducer(initialState, modalOpen);
        // console.log(state);
        expect(state).toEqual({
            modalOpen: true
        });

        const modalClose = uiCloseModal();
        const stateClose = uiReducer(initialState, modalClose);
        expect(stateClose).toEqual({
            modalOpen: false
        });

    });
});
import {useDispatch} from 'react-redux';

/* Importaciones propias */
import {uiOpenModal} from '../../actions/ui';
import {eventClearActiveEvent} from '../../actions/events';

export const AddNewFab = () => {
    const dispatch = useDispatch();

    const handleClickNew = () => {
        /* Limpiar evento activo */
        dispatch(eventClearActiveEvent());

        /* Abrir el modal */
        dispatch(uiOpenModal());
    }

    return (
        <button className="btn btn-primary fab"
                onClick={handleClickNew}>
            <i className="fas fa-plus"/>
        </button>
    )
}
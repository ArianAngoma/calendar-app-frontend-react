import {useDispatch} from 'react-redux';

/* Importaciones propias */
import {eventDeleted} from '../../actions/events';

export const DeleteEventFab = () => {
    /* dispatch de Redux */
    const dispatch = useDispatch();

    /* Función para disparar la acción de eliminar el evento del store */
    const handleDelete = () => {
        dispatch(eventDeleted());
    }

    return (
        <button className="btn btn-danger fab-danger"
                onClick={handleDelete}>
            <i className="fas fa-trash"/>
            <span> Borrar evento </span>
        </button>
    )
}
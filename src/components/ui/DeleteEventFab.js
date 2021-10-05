import {useDispatch} from 'react-redux';

/* Importaciones propias */
import {eventStartDelete} from '../../actions/events';

export const DeleteEventFab = () => {
    /* dispatch de Redux */
    const dispatch = useDispatch();

    /* Función para disparar la acción de eliminar el evento del store */
    const handleDelete = () => {
        // dispatch(eventDeleted()); -> antes de integrar con el backend
        dispatch(eventStartDelete());
    }

    return (
        <button className="btn btn-danger fab-danger"
                onClick={handleDelete}>
            <i className="fas fa-trash"/>
            <span> Borrar evento </span>
        </button>
    )
}
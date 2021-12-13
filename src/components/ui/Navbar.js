import {useDispatch, useSelector} from 'react-redux';
import {Offline, Online} from 'react-detect-offline';

/* Importaciones propias */
import {startLogout} from '../../actions/auth';

export const Navbar = () => {
    const dispatch = useDispatch();

    /* Store del auth */
    const {name} = useSelector(state => state.auth);

    /* Logout del usuario */
    /* Se realiza el logout porque en el AppRouter esta pendiente del checking y uid vuelve a cargar el componente */
    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                {name}
            </span>

            <Online>
                <span className="text-success">Online</span>
            </Online>
            <Offline>
                <span className="text-danger">Offline - Peticiones serán guardadas</span>
            </Offline>

            <button className="btn btn-outline-danger"
                    onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"/>
                <span> Salir</span>
            </button>
        </div>
    )
}
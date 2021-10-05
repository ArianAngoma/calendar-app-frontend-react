import {useDispatch, useSelector} from 'react-redux';

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

            <button className="btn btn-outline-danger"
                    onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"/>
                <span> Salir</span>
            </button>
        </div>
    )
}
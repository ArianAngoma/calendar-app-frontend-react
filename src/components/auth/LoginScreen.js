import {useDispatch} from 'react-redux';

/* Estilos del Auth */
import './login.css';

/* Importaciones propias */
import {useForm} from '../../hooks/useForm';
import {startLogin} from '../../actions/auth';

export const LoginScreen = () => {
    const dispatch = useDispatch();

    /* useForm para el formulario del login */
    const [formLoginValues, handleLoginInputChange, resetLoginValues] = useForm({
        loginEmail: 'test1@gmail.com',
        loginPassword: '123456'
    });
    const {loginEmail, loginPassword} = formLoginValues;

    /* Función para el submit del login */
    const handleLogin = (e) => {
        e.preventDefault();

        /* Dispara a la acción startLogin */
        dispatch(startLogin(loginEmail, loginPassword));
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={handleLoginInputChange}/>
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={handleLoginInputChange}/>
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"/>
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"/>
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"/>
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"/>
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"/>
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
import {useDispatch} from 'react-redux';
import Swal from 'sweetalert2';

/* Estilos del Auth */
import './login.css';

/* Importaciones propias */
import {useForm} from '../../hooks/useForm';
import {startLogin, startRegister} from '../../actions/auth';

export const LoginScreen = () => {
    const dispatch = useDispatch();

    /* useForm para el formulario del login */
    const [formLoginValues, handleLoginInputChange] = useForm({
        loginEmail: '',
        loginPassword: ''
    });
    const {loginEmail, loginPassword} = formLoginValues;

    /* Función para el submit del login */
    const handleLogin = (e) => {
        e.preventDefault();

        /* Dispara a la acción startLogin */
        dispatch(startLogin(loginEmail, loginPassword));
    }

    /* useForm para el formulario del registro */
    const [formRegisterValues, handleRegisterInputChange] = useForm({
        registerName: '',
        registerEmail: '',
        registerPassword1: '',
        registerPassword2: ''
    });
    const {registerName, registerEmail, registerPassword1, registerPassword2} = formRegisterValues;

    /* Función para el submit del register */
    const handleRegister = (e) => {
        e.preventDefault();

        if (registerPassword1 !== registerPassword2) return Swal.fire('Error', 'Las contraseñas deben de ser iguales', 'error');

        dispatch(startRegister(registerEmail, registerPassword2, registerName));
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
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={registerName}
                                onChange={handleRegisterInputChange}/>
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={handleRegisterInputChange}/>
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="registerPassword1"
                                value={registerPassword1}
                                onChange={handleRegisterInputChange}/>
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="registerPassword2"
                                value={registerPassword2}
                                onChange={handleRegisterInputChange}/>
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
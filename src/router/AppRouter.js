import {
    BrowserRouter as Router,
    Switch,
    // Route,
    Redirect
} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

/* Importaciones propias */
import {LoginScreen} from "../components/auth/LoginScreen";
import {CalendarScreen} from "../components/calendar/CalendarScreen";
import {useEffect} from 'react';
import {startChecking} from '../actions/auth';
import {PublicRoute} from './PublicRoute';
import {PrivateRoute} from './PrivateRoute';

export const AppRouter = () => {
    const dispatch = useDispatch();

    /* Estado de la autenticación */
    const {checking, uid} = useSelector(state => state.auth);

    /* Validar si tengo un usuario logueado */
    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    if (checking) {
        return (
            <div className="m-0 vh-100 row justify-content-center align-items-center">
                <div className="spinner-border text-primary"></div>
            </div>
        );
    }

    return (
        <Router>
            <div>
                <Switch>
                    {/*<Route exact path="/login" component={LoginScreen}/>
                    <Route exact path="/" component={CalendarScreen}/>*/}

                    <PublicRoute exact path="/login" component={LoginScreen} isAuthenticated={!!uid}/>
                    <PrivateRoute exact path="/" component={CalendarScreen} isAuthenticated={!!uid}/>

                    <Redirect to="/"/>
                </Switch>
            </div>
        </Router>
    )
}
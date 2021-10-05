import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import {useDispatch} from 'react-redux';

/* Importaciones propias */
import {LoginScreen} from "../components/auth/LoginScreen";
import {CalendarScreen} from "../components/calendar/CalendarScreen";
import {useEffect} from 'react';
import {startChecking} from '../actions/auth';

export const AppRouter = () => {
    const dispatch = useDispatch();

    /* Validar si tengo un usuario logueado */
    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/login" component={LoginScreen}/>
                    <Route exact path="/" component={CalendarScreen}/>

                    <Redirect to="/"/>
                </Switch>
            </div>
        </Router>
    )
}
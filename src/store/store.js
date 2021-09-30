import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

/* Importaciones propias */
import {rootReducers} from '../reducers/rootReducers';

/* Configuración de Redux para las herramientas de desarrollo */
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    rootReducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)
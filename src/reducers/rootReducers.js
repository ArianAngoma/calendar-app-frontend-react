import {combineReducers} from 'redux';

/* Importaciones propias */
import {uiReducer} from './uiReducer';

export const rootReducers = combineReducers({
    ui: uiReducer
})
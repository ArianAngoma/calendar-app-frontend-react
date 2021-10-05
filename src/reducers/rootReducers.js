import {combineReducers} from 'redux';

/* Importaciones propias */
import {uiReducer} from './uiReducer';
import {calendarReducer} from './calendarReducer';
import {authReducer} from './authReducer';

export const rootReducers = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer
})
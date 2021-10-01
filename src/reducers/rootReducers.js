import {combineReducers} from 'redux';

/* Importaciones propias */
import {uiReducer} from './uiReducer';
import {calendarReducer} from './calendarReducer';

export const rootReducers = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer
})
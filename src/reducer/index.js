import { combineReducers } from 'redux';
import spreadsheetReducer from './spreadsheetReducer';

const rootReducer = combineReducers({
    spreadsheetReducer,
});

export default rootReducer;

import {combineReducers} from 'redux';
import user from './user'
import events from './event'

const rootReducer = combineReducers({
	user,
	events
});

export default rootReducer;

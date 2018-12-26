import { combineReducers } from 'redux';
import user from "./setUserReducer";
import channel from './setCurrentChannelReducer';
import colors from './setColors';

const rootReducer = combineReducers({
    user,
    channel,
    colors,
})

export default rootReducer
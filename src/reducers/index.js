import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import blockdata from '../reducers/block';
import point from '../reducers/point';
import list from '../reducers/list';

const root_reducer = combineReducers({
    blockdata: blockdata,
    point: point,
    list: list,
    routing: routerReducer
})

export default root_reducer;
import { ActionType } from './action';
import { combineReducers } from 'redux';

const initialState = {
    width: undefined,
    height: undefined,
    zoom: 1,
}

function init(state = initialState, action) {
    switch(action.type) {
        case ActionType.INIT:
            return {
                ...state,
                width: action.payload.width,
                height: action.payload.height,
                zoom: action.payload.zoom,
            }
        default:
            return state;
    }
}

function layers(state = [], action) {
    switch(action.type) {
        default: 
            return state;
    }
}

export default combineReducers({
    init,
    layers
});

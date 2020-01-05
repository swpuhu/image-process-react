import { ActionType } from './action';
import { combineReducers } from 'redux';
import util from '../util/util';

const initialState = {
    width: undefined,
    height: undefined,
    zoom: 1,
    imagePool: {},
    currentLayer: undefined
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
        case ActionType.SET_CURRENT_LAYER:
            return {
                ...state,
                currentLayer: action.payload
            }
        default:
            return state;
    }
}

function layers(state = [], action) {
    switch(action.type) {
        case ActionType.ADD_LAYER:
            return [
                ...state,
                {
                    id: util.uuid(),
                    objects: []
                }
            ]
        default: 
            return state;
    }
}

export default combineReducers({
    init,
    layers
});

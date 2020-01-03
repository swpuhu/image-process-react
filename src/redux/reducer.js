import { actionType } from './action';
const initialState = {
    count: 0
}


function app (state = initialState, action) {
    switch (action.type) {
        case actionType.INCREMENT:
            state.count++;
            return {
                ...state, ...{
                    count: state.count
                }
            };
            break;
        default:
            return state;
    }
}

export default app;
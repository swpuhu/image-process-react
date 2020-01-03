export const actionType = { INCREMENT: 0, DECREMENT: 1 };


export function increment () {
    return {
        type: actionType.INCREMENT,
    }
}

export function decrement () {
    return {
        type: actionType.DECREMENT
    }
}
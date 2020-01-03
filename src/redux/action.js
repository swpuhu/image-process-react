export const ActionType = {
    INIT: 'init',
    ADD_LAYER: 'addLayer'
}


export function init(width, height, zoom) {
    return {
        type: ActionType.INIT,
        payload: {
            width,
            height,
            zoom
        }
    }
}
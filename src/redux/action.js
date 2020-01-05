export const ActionType = {
    INIT: 'init',
    ADD_LAYER: 'addLayer',
    ADD_OBJECT: 'addObject',
    SET_CURRENT_LAYER: 'setCurrentLayer'
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


export function addLayer() {
    return {
        type: ActionType.ADD_LAYER
    }
}

export function addObject(object) {
    return {
        type: ActionType.ADD_OBJECT,
        payload: object
    }

}

export function setCurrentLayer(uuid) {
    return {
        type: ActionType.SET_CURRENT_LAYER,
        payload: uuid
    }
}
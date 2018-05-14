export const setlist = (length) => {
    return (dispatch, getState) => {
        var x = new Array(length).fill(0);
        dispatch({
            type: 'setlist',
            data: x
        })

    }
}
export const updatelist = (key, data) => {
    return (dispatch, getState) => {
        let x = getState().list;
        x[key] = parseInt(data, 10);
        dispatch({
            type: 'updatelist',
            data: x
        })

    }
}
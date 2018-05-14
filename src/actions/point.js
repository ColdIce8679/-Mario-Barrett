export const updatepoint = (point) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'updatepoint',
            data: point
        })
    }
}
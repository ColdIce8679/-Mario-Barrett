export const getblockdata = () => {
    return (dispatch, getState, { api }) => {
        dispatch({
            type: 'getblockdata',
            data:  api.getblockdata()
        })

    }
}
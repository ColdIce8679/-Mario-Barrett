export default (state = 500, actions) => {
    switch (actions.type) {
        case 'updatepoint':
            state = actions.data;
            return state;
        default:
            return state;
    }
}
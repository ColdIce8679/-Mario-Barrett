export default (state = [], actions) => {
    switch (actions.type) {
        case 'setlist':
            state = actions.data;
            return [...state];
        case 'updatelist':
            state = actions.data;
            return [...state];
        default:
            return state;
    }
}
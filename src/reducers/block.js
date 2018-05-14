export default (state = [], actions) => {
    switch (actions.type) {
        case 'getblockdata': 
            state = actions.data;
            return state;
        default: 
            return state;
    }
}
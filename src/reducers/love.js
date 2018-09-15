const love = (state = {who: 'You'}, action) => {
    switch (action.type) {
        case 'LOVE_CHANGE':
            console.log(action.who);
            return {
                who: action.who
            };
        default:
            return state
    }
};

export default love


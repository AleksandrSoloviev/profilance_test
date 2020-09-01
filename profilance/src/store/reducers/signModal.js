const initialState = {
    isModalShown: false,
    isAuth: false,
    rights: 'none',
};

export default function signModalReducer(state = initialState, action) {
    switch (action.type) {
        case "TOGGLE":
            return {
                ...state,
                isModalShown: !state.isModalShown
            };
        case "AUTH":
            return {
                ...state,
                isAuth: action.isAuth,
                rights: action.rights

            };
        default:
            return state;
    }
}
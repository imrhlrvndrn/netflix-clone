export const initialState = {
    movie: null,
    tv: null,
    person: null,
    season_details: null,
    user: null,
};

const reducer = (state, action) => {
    console.log(action);

    switch (action.type) {
        case 'SET_MOVIE':
            return { ...state, movie: action.result };

        case 'SET_TV':
            return { ...state, tv: action.result };

        case 'SET_PERSON':
            return { ...state, person: action.result };

        case 'SET_SEASON_DETAILS':
            return { ...state, season_details: action.result };

        default:
            return state;
    }
};

export default reducer;

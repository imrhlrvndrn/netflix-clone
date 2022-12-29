export const initialState = {
    search_query: null,
    movie: null,
    tv: null,
    person: null,
    media_cast: null,
    person_known_for: null,
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

        case 'SET_PERSON_KNOWN_FOR':
            return { ...state, person_known_for: action.result };

        case 'SET_SEARCH_QUERY':
            return { ...state, search_query: action.result };

        case 'SET_CAST':
            return { ...state, media_cast: action.result };

        default:
            return state;
    }
};

export default reducer;

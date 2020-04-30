const initialState = {
    clickedPos: {},
    currentKm: 1500,
    cityIdx: 0,
    placedCities: 0,
    gameStatus: 'playing',
}

function reducer(state = initialState, action) {
    if (action.type === 'SET_CLICKED_POS') {
        return { ...state, clickedPos: action.payload }
    }
    if (action.type === 'SET_CURRENT_KM') {
        return { ...state, currentKm: state.currentKm - action.payload }
    }
    if (action.type === 'SET_CITY_IDX') {
        return { ...state, cityIdx: state.cityIdx + 1 }
    }
    if (action.type === 'SET_PLACED_CITIES') {
        return { ...state, placedCities: state.placedCities + 1 }
    }
    if (action.type === 'SET_GAME_STATUS') {
        return { ...state, gameStatus: action.payload }
    }
    return state
}

export default reducer;
import { START_GAME, PLAYING_GAME, REVEAL_GAME, NEXT_MATCH, SHOW_ERR, HIDE_ERR } from './../constants/ReduxTypes';
const INIT_STATE = {
    numberOfPlayers: 4,         // The number of players
    isReveal: false,            // The card is face up or down.
    isPlaying: false,           // The game is playing or not.
    isControlLoading: false,    // Control bar is loading or not
    players: [],                // Array points of player,
    deckId: null,               // The current deck identifier
    matchNumber: 0,             // The current match number
    err: ''
}

export default (state = INIT_STATE, action: any) => {
    switch (action.type) {
        // Make app loading
        case START_GAME:
            return {
                ...state,
                isControlLoading: true,

            }

        // Start playing game
        case PLAYING_GAME:
            return {
                ...state,
                deckId: action.payload,
                isControlLoading: false,
                matchNumber: 1
            }

        // Reveal game
        case REVEAL_GAME:
            return {
                ...state,
                isReveal: true
            }

        // Next game match 
        case NEXT_MATCH:
            const { matchNumber } = state;
            if (matchNumber < 5) {
                return {
                    ...state,
                    isReveal: false,
                    isControlLoading: true,
                    matchNumber: matchNumber + 1
                }
            }
            return state;

        // Show err Snackbars with error message
        case SHOW_ERR:
            return {
                ...state,
                err: action.payload
            }

        // Hide err Snackbars 
        case HIDE_ERR:
            return {
                ...state,
                err: ''
            }
        default:
            return state;
    }
}
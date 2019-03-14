import { START_GAME, PLAYING_GAME, REVEAL_GAME, NEXT_MATCH, SHOW_ERR, HIDE_ERR, DRAW_CARDS, SHUFFLE_GAME } from './../constants/ReduxTypes';
const INIT_STATE = {
    isReveal: false,            // The card is face up or down.
    isPlaying: false,           // The game is playing or not.
    isControlLoading: false,    // Control bar is loading or not
    playerCards: {},            // Array points of player,
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
                isPlaying: true
            }

        // Start playing game
        case PLAYING_GAME:
            return {
                ...state,
                deckId: action.payload,
                matchNumber: 1
            }

        case SHUFFLE_GAME:
            return {
                ...state,
                isControlLoading: true,
                playerCards: [],
                matchNumber: 0
            }

        case DRAW_CARDS:
            console.log(action)
            return {
                ...state,
                isControlLoading: false,
                playerCards: { ...state.playerCards, [state.matchNumber]: action.payload }
            }

        // Reveal game
        case REVEAL_GAME:
            return {
                ...state,
                isReveal: true,
                playerCards: action.payload
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
            return {
                ...state,
                isPlaying: false,
                isReveal: true,
                isControlLoading: false,
                matchNumber: 6
            }

        // Show err Snackbars with error message
        case SHOW_ERR:
            console.log(action)
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
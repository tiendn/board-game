import { Config } from './../constants/Config';
import { START_GAME, PLAYING_GAME, REVEAL_GAME, NEXT_MATCH, SHOW_ERR, HIDE_ERR, DRAW_CARDS, END_GAME, BACK_MATCH, SHUFFLE_GAME_START, SHUFFLE_GAME_SUCCESS, SHUFFLE_GAME_FAILED, PLAY_GAME_AGAIN } from './../constants/ReduxTypes';
const INIT_STATE = {
    isReveal: false,            // The card is face up or down.
    isPlaying: false,           // The game is playing or not.
    isControlLoading: false,    // Control bar is loading or not
    isEndGame: false,
    playerCards: {},            // Array cards of player by each match,
    playerPoints: {
        [Config.Player.A]: 20000,
        [Config.Player.B]: 20000,
        [Config.Player.C]: 20000,
        [Config.Player.D]: 20000,
    },           // Array points of player by each match,
    playerRemain: [Config.Player.A, Config.Player.B, Config.Player.C, Config.Player.D],    // Number of players remain in game
    deckId: null,               // The current deck identifier
    matchNumber: 0,             // The current match number
    cardRemain: 52,          // Number of cards remain in game
    err: ''
}

export default (state = INIT_STATE, action: any) => {
    switch (action.type) {
        // Make app loading
        case START_GAME:
            return {
                ...state,
                isReveal: false,
                isControlLoading: true,
                isPlaying: true,
                isEndGame: false
            }

        // Start playing game
        case PLAYING_GAME:
            return {
                ...state,
                deckId: action.payload,
                matchNumber: 1
            }

        case SHUFFLE_GAME_START:
            return {
                ...state,
                isControlLoading: true,
            }

        case SHUFFLE_GAME_SUCCESS:
            return {
                ...state,
                isControlLoading: false,
                cardRemain: 52
            }

        case SHUFFLE_GAME_FAILED:
            return {
                ...state,
                isControlLoading: false,
            }

        case DRAW_CARDS:
            return {
                ...state,
                isControlLoading: false,
                cardRemain: action.payload.cardRemain,
                playerCards: { ...state.playerCards, [state.matchNumber]: action.payload.playerCards }
            }

        // Reveal game
        case REVEAL_GAME:
            return {
                ...state,
                isReveal: true,
                playerPoints: action.payload.playerPoints,
                playerRemain: action.payload.playerRemain
            }

        // Next game match 
        case NEXT_MATCH:
            return {
                ...state,
                isReveal: false,
                isControlLoading: true,
                matchNumber: state.matchNumber + 1
            }

        case BACK_MATCH:
            return {
                ...state,
                isReveal: true,
                isControlLoading: false,
                matchNumber: state.matchNumber - 1
            }

        case END_GAME:
            return {
                ...state,
                isReveal: true,
                playerPoints: action.payload.playerPoints,
                playerRemain: action.payload.playerRemain,
                isEndGame: true,
            }

        case PLAY_GAME_AGAIN:
            return {
                ...INIT_STATE,
                playerPoints: {
                    [Config.Player.A]: 20000,
                    [Config.Player.B]: 20000,
                    [Config.Player.C]: 20000,
                    [Config.Player.D]: 20000,
                },
            };

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
import { getPlayerFromIndex } from './../utils/Utils';
import { Config } from './../constants/Config';
import { Api } from './../api/Api';
import { START_GAME, PLAYING_GAME, REVEAL_GAME, SHOW_ERR, HIDE_ERR, DRAW_CARDS, SHUFFLE_GAME } from './../constants/ReduxTypes';
import { AxiosResponse } from 'axios';
import { PlayerCard } from '../entities/PlayerCard';
export const playGame = (deckId: string) => (dispatch: Function) => {
    if (!deckId) {
        initDeck(dispatch);                 // New game
    } else {
        shuffleDeck(dispatch, deckId);      // Play again game
    }
    dispatch({
        type: START_GAME
    })
}

export const shuffleDeck = async (dispatch: Function, deckId: string) => {
    const result = await Api.reShuffleCard(deckId);
    console.log(result);
    const { data } = result;
    if (data && data.success) {
        drawCards(dispatch, Config.numberOfPlayers, data.deck_id);
        dispatch({
            type: SHUFFLE_GAME
        })
    }
}

const initDeck = async (dispatch: Function) => {
    const result = await Api.giveDeckCard();
    console.log(result);

    const { data } = result;
    if (data && data.success) {
        drawCards(dispatch, Config.numberOfPlayers, data.deck_id);
        dispatch({
            type: PLAYING_GAME,
            payload: data.deck_id
        })
    } else {
        dispatch(showError("Init game failed"));
    }
}

// Reveal
// export const revealGame = () => (getState: Function) => {
//     const state = getState();
//     const { playerCards, matchNumber, numberOfPlayers } = state.game;
//     if (playerCards[matchNumber]) {
//         // Loop each card to calculate total point
//         const point = getPointFromValue(data.value);
//         if (point > max) {
//             indexMax = index;
//             max = point;
//         } else if (point === max) {
//             indexMax = [...indexMax, index];

//         }
//         return {
//             type: REVEAL_GAME,
//             payload: playerCards
//         }
//     }
// }

export const drawCards = async (dispatch: Function, numberOfPlayers: number, deckId: string) => {
    const promises = [];
    for (let i = 1; i <= numberOfPlayers; i++) {
        const q = Api.drawCards(deckId);
        promises.push(q);
    }
    Promise.all(promises).then(async (response) => {
        let playerCards = {};

        playerCards = await checkAndGetDrawCardsStatus(response);
        console.log(playerCards);

        if (!playerCards) dispatch(showError("Fetch data failed"));
        dispatch({
            type: DRAW_CARDS,
            payload: playerCards
        })
    })
}

export const showError = (err: string) => {
    return {
        type: SHOW_ERR,
        payload: err
    }
}

export const hideError = () => {
    return {
        type: HIDE_ERR
    }
}

const getPointFromValue = (value: number | string) => {
    if (typeof (value) === "number") {
        return value;
    } else if (typeof (value) === "string") {
        if (value == "ACE") {
            return 1;
        }
        // if (value == "JACK" || value == "QUEEN" || value == "KING") {
        return 10;
    }
    return 0;
}

const checkAndGetDrawCardsStatus = (response: AxiosResponse[]) => {
    return new Promise((resolve, reject) => {
        let playerCards: PlayerCard = {
            A: [],
            B: [],
            C: [],
            D: []
        };

        response.forEach((r, index) => {
            const { data } = r;
            const playerId = getPlayerFromIndex(index + 1);
            if (playerId) {
                playerCards[playerId] = data.cards;
            } else {
                reject(new Error("Get player id failed"));
            }
        });

        resolve(playerCards);
    });
}
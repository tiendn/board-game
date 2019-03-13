import { Api } from './../api/Api';
import { START_GAME, PLAYING_GAME, REVEAL_GAME, SHOW_ERR, HIDE_ERR } from './../constants/ReduxTypes';
export const playGame = (deckId: string) => {
    if (!deckId) {
        // New game
        initDeck();
    } else {
        // Play again game
        shuffleDeck(deckId);
    }
    return {
        type: START_GAME
    }
}

export const shuffleDeck = async (deckId: string) => {
    const result = await Api.reShuffleCard(deckId);
    console.log(result);
    // if (result && result.success) {
    //     return {
    //     type: PLAYING_GAME,
    //     payload: result.deck_id
    // } 
    // }
}

const initDeck = async () => {
    const result = await Api.giveDeckCard();
    console.log(result);
    // if (result && result.success) {
    //     return {
    //     type: PLAYING_GAME,
    //     payload: result.deck_id
    // } 
    // }
}

export const revealGame = () => {
    return {
        type: REVEAL_GAME
    }
}

export const drawCards = (numberOfPlayers: number = 4, deckId: string) => {
    const promises = [];
    for (let i = 1; i <= numberOfPlayers; i++) {
        const q = Api.drawCards(deckId);
        promises.push(q);
    }
    Promise.all(promises).then((response) => {
        console.log(response);
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


import { CardEntity } from './../entities/Card';
import { getPlayerFromIndex, getPointFromValue } from './../utils/Utils';
import { Config } from './../constants/Config';
import { Api } from './../api/Api';
import { START_GAME, PLAYING_GAME, REVEAL_GAME, SHOW_ERR, HIDE_ERR, DRAW_CARDS, SHUFFLE_GAME_START, SHUFFLE_GAME_SUCCESS, END_GAME, NEXT_MATCH, BACK_MATCH, SHUFFLE_GAME_FAILED, PLAY_GAME_AGAIN } from './../constants/ReduxTypes';
import { AxiosResponse } from 'axios';
export const playGame = () => (dispatch: Function) => {
    initDeck(dispatch);                 // New game
    dispatch({
        type: START_GAME
    })
}


const initDeck = async (dispatch: Function) => {
    const result = await Api.giveDeckCard();

    const { data } = result;
    if (data && data.success) {
        dispatch({
            type: PLAYING_GAME,
            payload: data.deck_id
        })
        dispatch(drawCards());

    } else {
        dispatch(showError("Init game failed"));
    }
}

// Shuffle deck
export const shuffleDeck = (deckId: string) => async (dispatch: Function) => {
    dispatch({
        type: SHUFFLE_GAME_START
    })
    const result = await Api.shuffleDeck(deckId);
    const { data } = result;

    if (data && data.success) {
        dispatch({
            type: SHUFFLE_GAME_SUCCESS
        })
    } else {
        dispatch(showError("Shuffle game failed"));
        dispatch({
            type: SHUFFLE_GAME_FAILED
        });
    }
}

// Reveal
export const revealGame = () => async (dispatch: Function, getState: Function) => {
    const state = getState();
    const { playerCards, matchNumber, playerRemain, playerPoints } = state.game;
    if (playerCards[matchNumber]) {
        const result: any = await getPlayerPointByMatch(playerCards[matchNumber], playerRemain, playerPoints);
        const { newPlayerPoints, newPlayerRemain } = result;
        // If game 5, alert the winner + shuffle.
        if (matchNumber === 5 || newPlayerRemain.length === 1) {
            dispatch({
                type: END_GAME,
                payload: {
                    playerPoints: newPlayerPoints,
                    playerRemain: newPlayerRemain
                }
            })
        }

        dispatch({
            type: REVEAL_GAME,
            payload: {
                playerPoints: newPlayerPoints,
                playerRemain: newPlayerRemain
            }
        })
    }
}

export const drawCards = () => (dispatch: Function, getState: Function) => {
    const state = getState();
    const { deckId, cardRemain, playerRemain } = state.game;

    if (cardRemain < playerRemain.length * Config.numberOfCardsPerMatch) {
        dispatch(showError("Please shuffle the deck, not enough card"));
        dispatch(backMatch());
        return;
    }
    let newCardRemain = cardRemain - playerRemain.length * Config.numberOfCardsPerMatch;
    const promises = [];
    for (let i = 1; i <= playerRemain.length; i++) {
        const q = Api.drawCards(deckId);
        promises.push(q);
    }
    Promise.all(promises).then(async (response) => {
        let playerCards = {};

        playerCards = await checkAndGetDrawCardsStatus(response, playerRemain);

        if (!playerCards) {
            dispatch(showError("Fetch data failed"));
            dispatch(shuffleDeck(deckId));
            return;
        }
        dispatch({
            type: DRAW_CARDS,
            payload: {
                playerCards,
                cardRemain: newCardRemain
            }
        })
    })
}

export const nextMatch = () => {
    return {
        type: NEXT_MATCH
    }
}

export const backMatch = () => {
    return {
        type: BACK_MATCH
    }
}

export const playGameAgain = () => {
    return {
        type: PLAY_GAME_AGAIN
    }
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

const checkAndGetDrawCardsStatus = (response: AxiosResponse[], playerRemain: string[]) => {
    return new Promise((resolve, reject) => {
        let playerCards: any = {};

        response.forEach((r, index) => {
            const { data } = r;
            playerCards[playerRemain[index]] = data.cards;
        });

        resolve(playerCards);
    });
}

const getPlayerPointByMatch = (playerCardByMatch: any, playerRemain: string[], playerPoints: any) => {
    const playerCardValue: any = {};
    let winners: any = [];
    // Get max total card value
    let maxCardValue = -99999999;
    let newPlayerRemain = [...playerRemain];

    return new Promise((resolve, reject) => {
        new Promise((s) => {
            // Get total value of this match each player
            playerRemain.forEach((player, index) => {
                playerCardByMatch[player].forEach((card: CardEntity) => {

                    if (!playerCardValue[player]) {
                        playerCardValue[player] = 0;
                    }
                    playerCardValue[player] += getPointFromValue(card.value);

                    if (playerCardValue[player] > maxCardValue) {
                        maxCardValue = playerCardValue[player];
                    }
                })
            });
            s();
        }).then(() => {
            playerRemain.forEach((player, index) => {
                if (maxCardValue === playerCardValue[player]) {
                    winners.push(player);
                }
            });
        }).then(() => {
            // Check which player win
            const winnerLength = winners.length;
            const gift = Config.betPoints * (playerRemain.length - winnerLength) / winnerLength;

            playerRemain.forEach((player, index) => {
                if (winners.indexOf(player) >= 0) {
                    playerPoints[player] += gift;
                } else {
                    // Re-calculate point of each player, if < 5000 out.
                    playerPoints[player] -= Config.betPoints;
                    if (playerPoints[player] < Config.betPoints) {
                        newPlayerRemain = newPlayerRemain.filter((p) => p !== player);
                    }
                }
            })

            const result: any = {
                newPlayerPoints: playerPoints,
                newPlayerRemain
            }

            resolve(result);
        })
    })
}
import axios from 'axios';

export class Api {
    static TIMEOUT_RESPONSE = 10000; // ms

    static async get(url: string, params = {}) {
        const initParams = {
            timeout: this.TIMEOUT_RESPONSE,
        }
        const result = await axios.get(url, { ...initParams, ...params });
        // Handle server error
        // if (result.status < 200 || result.status >= 400) return;
        return result;
    }

    /**
     * Get new deck of cards
     */
    static async giveDeckCard() {
        const result = await Api.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        return result;
    }

    /**
     * Reshuffle the current session of game. 
     * 
     * All remaining card will be returned to default value: 52 cards
     */
    static async reShuffleCard(deck_id: string) {
        const result = await Api.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=3`);
        return result;
    }

    /**
     * Get three cards in deck.
     */
    static async drawCards(deck_id: string) {
        const result = await Api.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=3`);
        return result;
    }
}
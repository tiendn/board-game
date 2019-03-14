import React from 'react';
import { connect } from 'react-redux';
import GCard from './GCard';
import { PlayerCard } from '../entities/PlayerCard';
import { getPlayerFromIndex } from '../utils/Utils';

interface Props {
    isReveal: boolean,
    playerId: number,
    playerCards: PlayerCard[],
    matchNumber: number
}

class Player extends React.PureComponent<Props> {
    render() {
        const { isReveal, playerId, playerCards, matchNumber } = this.props;
        const data = playerCards[matchNumber];

        const player = getPlayerFromIndex(playerId);
        if (!player) throw Error("Cannot get player key");

        if (!data) {
            // throw Error("No data player card");
            return (
                <div className="player-container" />
            )
        }

        // With case config number of player
        if (!data[player]) return (
            <div className="player-container" />
        )

        return (
            <div className="player-container">
                <div className="row">
                    <GCard isReveal={isReveal} card={data[player][0]} />
                    <GCard isReveal={isReveal} card={data[player][1]} />
                    <GCard isReveal={isReveal} card={data[player][2]} />
                </div>
                <h3 className="text-center">{playerId}</h3>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    isReveal: state.game.isReveal,
    matchNumber: state.game.matchNumber,
    playerCards: state.game.playerCards
})

export default connect(mapStateToProps)(Player);
import React from 'react';
import { connect } from 'react-redux';
import GCard from './GCard';
import { getPlayerFromIndex } from '../utils/Utils';

interface Props {
    isReveal: boolean,
    playerId: string,
    playerCards: any[],
    matchNumber: number
}

class Player extends React.PureComponent<Props> {
    render() {
        const { isReveal, playerId, playerCards, matchNumber } = this.props;
        const data = playerCards[matchNumber];

        if (!data) {
            return (
                <div className="player-container" />
            )
        }

        // With case config number of player
        if (!data[playerId]) return (
            <div className="player-container" />
        )

        return (
            <div className="player-container">
                <div className="row">
                    <GCard isReveal={isReveal} card={data[playerId][0]} />
                    <GCard isReveal={isReveal} card={data[playerId][1]} style={{ marginLeft: "-20%" }} />
                    <GCard isReveal={isReveal} card={data[playerId][2]} style={{ marginLeft: "-20%" }} />
                </div>
                <div className="text-center">{playerId}</div>
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
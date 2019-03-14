// Store Table
import React from 'react';
import { connect } from 'react-redux';
import { PlayerCard } from '../entities/PlayerCard';

interface Props {
    playerCards: PlayerCard[],
    isPlaying: boolean,
    matchNumber: number
}

class ScoreTable extends React.PureComponent<Props> {
    getPlayerPoint(playerId: string) {
        const { playerCards, matchNumber } = this.props;

    }

    render() {
        const { playerCards, isPlaying, matchNumber } = this.props;
        if (!isPlaying) return null;

        return (
            <div id="score-table">
                <div className="text-center">SCORE TABLE</div>
                <div>Game: {matchNumber}</div>
                <div>
                    <div>A: points</div>
                    <div>B: points</div>
                    <div>C: points</div>
                    <div>D: points</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        isPlaying: state.game.isPlaying,
        playerCards: state.game.playerCard,
        matchNumber: state.game.matchNumber
    }
}

export default connect(mapStateToProps)(ScoreTable);
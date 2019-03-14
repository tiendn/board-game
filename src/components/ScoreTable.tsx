// Store Table
import React from 'react';
import { connect } from 'react-redux';
import { Config } from '../constants/Config';

interface Props {
    currentPlayerPoints: any,
    isPlaying: boolean,
    matchNumber: number
}

const ScoreTable = (props: Props) => {
    const { currentPlayerPoints, isPlaying, matchNumber } = props;
    if (!isPlaying) return null;

    return (
        <div id="score-table">
            <div className="text-center">SCORE TABLE</div>
            <div>Game: {matchNumber}</div>
            <div>
                <div>A: {currentPlayerPoints[Config.Player.A]} points</div>
                <div>B: {currentPlayerPoints[Config.Player.B]} points</div>
                <div>C: {currentPlayerPoints[Config.Player.C]} points</div>
                <div>D: {currentPlayerPoints[Config.Player.D]} points</div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        isPlaying: state.game.isPlaying,
        currentPlayerPoints: Object.assign({}, state.game.playerPoints),
        matchNumber: state.game.matchNumber
    }
}

export default connect(mapStateToProps)(ScoreTable);
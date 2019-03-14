// Store Table
import React from 'react';
import classNames from 'classnames';
import { AccountBox } from '@material-ui/icons';
import { connect } from 'react-redux';
import { Config } from '../constants/Config';
import LionImg from '../assets/lion.png';

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
            <div className={classNames("text-center", "bold")}>GAME: {matchNumber} (${Config.betPoints})</div>
            <div style={{ paddingLeft: 5, letterSpacing: 1.2, paddingTop: 6 }}>
                <div className="point-value"><AccountBox className="point-icon" />A <span className="margin-left-16">${currentPlayerPoints[Config.Player.A].toLocaleString()}</span> <span className="point-label"></span></div>
                <div className={classNames("point-value", "point-value-highest")}><AccountBox className="point-icon" />B <span className="margin-left-16">${currentPlayerPoints[Config.Player.B].toLocaleString()}</span> <span className="point-label"></span></div>
                <div className="point-value"><AccountBox className="point-icon" />C <span className="margin-left-16">${currentPlayerPoints[Config.Player.C].toLocaleString()}</span> <span className="point-label"></span></div>
                <div className="point-value"><AccountBox className="point-icon" />D <span className="margin-left-16">${currentPlayerPoints[Config.Player.D].toLocaleString()}</span> <span className="point-label"></span></div>
            </div>
            <img src={LionImg} className="score-tattoo" />
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
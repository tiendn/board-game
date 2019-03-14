import React from 'react';
import classNames from 'classnames';
import ControlBar from './ControlBar';
import Player from './Player';
import WarningSnackbars from './WarningSnackbars';
import ScoreTable from './ScoreTable';
import { Config } from '../constants/Config';
import EndGame from './EndGame';

export default class Game extends React.PureComponent {
    render() {
        return (
            <div className="container">
                <div id="game-container">
                    <Player playerId={Config.Player.A} />
                    <div className={classNames("row", "full-width")} style={{ justifyContent: "space-between" }}>
                        <Player playerId={Config.Player.C} />
                        <ControlBar />
                        <Player playerId={Config.Player.D} />
                    </div>
                    <Player playerId={Config.Player.B} />
                </div>
                <WarningSnackbars />
                <ScoreTable />
                <EndGame />
            </div>
        )
    }
}
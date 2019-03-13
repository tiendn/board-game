import React from 'react';
import ControlBar from './ControlBar';
import Player from './Player';
import WarningSnackbars from './WarningSnackbars';

export default class Game extends React.PureComponent {
    render() {
        return (
            <div>
                <Player />
                <ControlBar />
                <WarningSnackbars />
            </div>
        )
    }
}
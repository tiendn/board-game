// Control bar
import React from 'react';
import { connect } from 'react-redux';
import ControlButton from './ControlButton';
import { Fab } from '@material-ui/core';
import { PlayCircleFilled } from '@material-ui/icons';
import { playGame } from '../actions/GameAction';
import Progress from './Progress';

interface Props {
    isPlaying: boolean;
    isControlLoading: boolean;
    deckId: string;
    dispatch: Function
}

class ControlBar extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);
        this.onPlay = this.onPlay.bind(this);
    }

    onPlay() {
        const { dispatch, deckId } = this.props;
        dispatch(playGame(deckId));
    }

    render() {
        const { isPlaying, isControlLoading } = this.props;
        if (!isPlaying) {
            return (
                <Fab color="primary" aria-label="Play" className="control-btn" onClick={this.onPlay}>
                    <PlayCircleFilled />
                </Fab>
            );
        }
        if (isControlLoading) {
            return (
                <Progress />
            );
        }
        return (
            <div>
                {/* <ControlButton  /> */}
                Control buttn
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        isPlaying: state.game.isPlaying,
        isControlLoading: state.game.isControlLoading,
        deckId: state.game.deckId,
    }
}

export default connect(mapStateToProps)(ControlBar);
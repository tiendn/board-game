// Control bar
import React from 'react';
import { connect } from 'react-redux';
import ControlButton from './ControlButton';
import { Fab, Tooltip } from '@material-ui/core';
import { PlayCircleFilled, CloseRounded } from '@material-ui/icons';
import { playGame, shuffleDeck, drawCards, revealGame, nextMatch, playGameAgain } from '../actions/GameAction';
import Progress from './Progress';
import MyDialog from './MyDialog';

interface Props {
    isPlaying: boolean;
    isControlLoading: boolean;
    isReveal: boolean;
    isEndGame: boolean;
    cardRemain: number;
    deckId: string;
    dispatch: Function;
    style?: any;
}

class ControlBar extends React.PureComponent<Props> {
    dialogRef: any;
    constructor(props: Props) {
        super(props);
        this.onPlay = this.onPlay.bind(this);
        this.onShuffle = this.onShuffle.bind(this);
        this.onReveal = this.onReveal.bind(this);
        this.onDraw = this.onDraw.bind(this);
        this.shuffle = this.shuffle.bind(this);
        this.rePlayGame = this.rePlayGame.bind(this);
    }

    onDraw() {
        const { dispatch, deckId } = this.props;
        dispatch(nextMatch());
        dispatch(drawCards());
    }

    onReveal() {
        this.props.dispatch(revealGame());
    }

    onShuffle() {
        if (this.dialogRef) {
            this.dialogRef.showDialog();
        }
    }

    onPlay() {
        const { dispatch, deckId } = this.props;
        dispatch(playGame());
    }

    rePlayGame() {
        this.props.dispatch(playGameAgain());
    }

    shuffle() {
        const { dispatch, deckId } = this.props;
        dispatch(shuffleDeck(deckId));
    }

    renderControlBar() {
        const { isEndGame, isReveal } = this.props;
        if (isEndGame) {
            return (
                <Tooltip title="Quit" placement="top">
                    <Fab color="secondary" aria-label="Quit" className="control-btn" onClick={this.rePlayGame}>
                        <CloseRounded />
                    </Fab>
                </Tooltip>
            )
        }

        return (
            <div className="row" style={{ justifyContent: 'space-between' }}>
                <ControlButton title="Shuffle" color="default" ariaLabel="Shuffle" onClick={this.onShuffle} />
                <ControlButton title="Reveal" color="primary" ariaLabel="Reveal" onClick={this.onReveal} />
                <ControlButton disabled={!isReveal} title="Draw" color="secondary" ariaLabel="Draw" onClick={this.onDraw} />
                <MyDialog
                    ref={(ref) => this.dialogRef = ref}
                    dialogContent="All cards will be shuffled"
                    dialogTitle="Shuffle the deck"
                    onAgree={this.shuffle}
                />
            </div>
        )
    }

    renderPlayBtn() {
        return (
            <Tooltip title="Play" placement="top">
                <Fab color="primary" aria-label="Play" className="control-btn" onClick={this.onPlay}>
                    <PlayCircleFilled />
                </Fab>
            </Tooltip>
        );
    }

    render() {
        const { isPlaying, isControlLoading, isReveal, cardRemain, style } = this.props;
        if (!isPlaying) {
            return (
                <Tooltip title="Play" placement="top">
                    <Fab color="primary" aria-label="Play" className="control-btn" onClick={this.onPlay}>
                        <PlayCircleFilled />
                    </Fab>
                </Tooltip>
            )
        }
        if (isControlLoading) {
            return (
                <Progress />
            );
        }

        return (
            <div style={style} className="control-bar">
                {this.renderControlBar()}
                <p className="text-center">Number of cards remain: {cardRemain} </p>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        isReveal: state.game.isReveal,
        isPlaying: state.game.isPlaying,
        isControlLoading: state.game.isControlLoading,
        isEndGame: state.game.isEndGame,
        deckId: state.game.deckId,
        cardRemain: state.game.cardRemain
    }
}

export default connect(mapStateToProps)(ControlBar);
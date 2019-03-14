import React from 'react';
import { connect } from 'react-redux';
import MyDialog from './MyDialog';
import { Config } from '../constants/Config';
import { playGameAgain } from '../actions/GameAction';

interface Props {
    matchNumber: number;
    playerPoints: any;
    isEndGame: boolean;
    dispatch: Function;
}

interface State {
    dialogTitle: string
    dialogContent: string
}

class EndGame extends React.PureComponent<Props, State> {
    dialogRef: any;
    constructor(props: Props) {
        super(props);
        this.state = {
            dialogTitle: "",
            dialogContent: ""
        }
        this.playAgain = this.playAgain.bind(this);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.matchNumber === 5 && nextProps.isEndGame) {
            this.getWinnerInformation();
        }
    }

    getWinnerInformation() {
        const { playerPoints } = this.props;
        let maxPoints = -999999;
        let winnerId = "";
        let dialogContent = "";
        let dialogTitle = "";
        Object.keys(playerPoints).forEach((playerId) => {
            if (playerPoints[playerId] > maxPoints) {
                maxPoints = playerPoints[playerId];
                winnerId = playerId;
            }
        })


        dialogTitle = winnerId === Config.currentPlayer ? "VICTORY" : "DEFEAT";
        dialogContent = `The winner is ${winnerId} and have ${maxPoints} points`;

        this.setState({
            dialogTitle, dialogContent
        }, () => {
            if (this.dialogRef) {
                this.dialogRef.showDialog();
            }
        })
    }

    playAgain() {
        this.props.dispatch(playGameAgain());
    }

    render() {
        const { dialogContent, dialogTitle } = this.state;

        return (
            <MyDialog
                ref={(ref) => this.dialogRef = ref}
                dialogContent={dialogContent}
                dialogTitle={dialogTitle}
                btnOpenTitle="Play again"
                btnCloseTitle="Quit"
                onAgree={this.playAgain}
            />
        );
    }

}

const mapStateToProps = (state: any) => ({
    matchNumber: state.game.matchNumber,
    playerPoints: state.game.playerPoints,
    isEndGame: state.game.isEndGame
})

export default connect(mapStateToProps)(EndGame);

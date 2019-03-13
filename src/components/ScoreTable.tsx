// Store Table
import React from 'react';
import { connect } from 'react-redux';

interface Props {
    players: Array<number>
}

class ScoreTable extends React.PureComponent<Props> {
    render() {
        const { players } = this.props;
        return (
            <div />
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        players: state.game.players
    }
}

export default connect(mapStateToProps)(ScoreTable);
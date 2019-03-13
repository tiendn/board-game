import React from 'react';
import { connect } from 'react-redux';
import GCard from './GCard';

interface Props {
    isReveal: boolean
}

class Player extends React.PureComponent<Props> {
    render() {
        const { isReveal } = this.props;
        return (
            <div>
                <GCard isReveal={isReveal} />
                <GCard isReveal={isReveal} />
                <GCard isReveal={isReveal} />
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    isReveal: state.game.isReveal
})

export default connect(mapStateToProps)(Player);
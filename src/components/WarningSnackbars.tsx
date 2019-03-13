import React from 'react';
import { connect } from 'react-redux';
import { Close, Warning } from '@material-ui/icons';
import { IconButton, SnackbarContent, Snackbar } from '@material-ui/core';
import { hideError } from '../actions/GameAction';

interface WarningProps {
    err: string,
    dispatch: Function
}

class WarningSnackbars extends React.Component<WarningProps> {
    constructor(props: WarningProps) {
        super(props);
        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        this.props.dispatch(hideError());
    }

    render() {
        const { err } = this.props;

        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={err !== ''}
                autoHideDuration={3000}
                onClose={this.onClose}
            >
                <SnackbarContent
                    aria-describedby="client-snackbar"
                    message={
                        <span id="client-snackbar" >
                            <Warning />
                            {err}
                        </span>
                    }
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.onClose}
                        >
                            <Close />
                        </IconButton>,
                    ]}
                />
            </Snackbar>
        );
    }
}

const mapStateToProps = (state: any) => ({
    err: state.game.err
})

export default connect(mapStateToProps)(WarningSnackbars);
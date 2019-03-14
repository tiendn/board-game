import React from 'react';
import { connect } from 'react-redux';
import { Close, Warning } from '@material-ui/icons';
import { IconButton, SnackbarContent, Snackbar } from '@material-ui/core';
import { hideError } from '../actions/GameAction';
import { amber } from '@material-ui/core/colors';
import { Colors } from '../constants/Colors';

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
                    horizontal: 'center',
                }}
                open={err !== ''}
                autoHideDuration={3000}
                onClose={this.onClose}
            >
                <SnackbarContent
                    aria-describedby="client-snackbar"
                    message={
                        <span id="client-snackbar">
                            <Warning style={{ paddingRight: 10 }} />
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
                    style={{ backgroundColor: Colors.redWarning }}
                />
            </Snackbar>
        );
    }
}

const mapStateToProps = (state: any) => ({
    err: state.game.err
})

export default connect(mapStateToProps)(WarningSnackbars);
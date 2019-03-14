import React, { MouseEvent } from 'react'
import { DialogTitle, Dialog, DialogContent, DialogActions, Button, DialogContentText } from '@material-ui/core';

interface Props {
    dialogContent: string;
    dialogTitle: string;
    btnCloseTitle?: string;
    btnOpenTitle?: string;
    onAgree: Function;
}

interface State {
    open: boolean
}

export default class MyDialog extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            open: false
        }
        this.handleClose = this.handleClose.bind(this);
        this.showDialog = this.showDialog.bind(this);
    }

    showDialog() {
        this.setState({ open: true });
    }

    handleClose() {
        this.setState({ open: false });
    }

    render() {
        const { open } = this.state;
        const { dialogContent, dialogTitle, btnCloseTitle, btnOpenTitle } = this.props;

        return (
            <Dialog
                open={open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        {btnCloseTitle || "Disagree"}
                    </Button>
                    <Button onClick={() => {
                        this.handleClose();
                        this.props.onAgree();
                    }}
                        color="primary" autoFocus>
                        {btnOpenTitle || "Agree"}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}
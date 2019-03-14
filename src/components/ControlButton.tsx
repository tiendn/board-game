import React from 'react';
import { Fab, PropTypes } from '@material-ui/core';
import { } from '@material-ui/icons';

interface Props {
    title: string,
    onClick: Function,
    color: PropTypes.Color,
    ariaLabel: string,
    disabled?: boolean
}

export default (props: Props) => (
    <Fab
        variant="extended"
        color={props.color}
        aria-label={props.ariaLabel}
        className="control-button"
        onClick={() => props.onClick()}
        disabled={props.disabled}
    >
        {props.title}
    </Fab>
);
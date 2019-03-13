import React from 'react';
import { Fab } from '@material-ui/core';
import { } from '@material-ui/icons';

export default (title = '', onClick: () => {}, icon = null, ariaLabel = "") => (
    <Fab variant="extended" color="primary" aria-label={ariaLabel} className="control-button">
        {icon}
        {title}
    </Fab>
);
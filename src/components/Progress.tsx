import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme: any) => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

const Progress = (props: any) => {
    const { classes } = props;
    return (
        <CircularProgress className={classes.progress} color="primary" />
    );
}

Progress.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Progress);
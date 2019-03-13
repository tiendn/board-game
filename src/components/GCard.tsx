import React from 'react';
import { connect } from 'react-redux';
import { Card, CardContent } from '@material-ui/core';
import { Help } from '@material-ui/icons';
interface Props {
    isReveal: boolean
}

export default class GCard extends React.PureComponent<Props>{
    render() {
        const { isReveal } = this.props;
        if (isReveal) {

        }

        return (
            <Card className="card">
                <CardContent>
                    <Help />
                </CardContent>

            </Card>
        );
    }
}

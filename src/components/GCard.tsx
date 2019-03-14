import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Card, CardContent, CardMedia } from '@material-ui/core';
import { Help } from '@material-ui/icons';
import { CardEntity } from '../entities/Card';
interface Props {
    isReveal: boolean,
    card: CardEntity
}

export default class GCard extends React.PureComponent<Props>{
    render() {
        const { isReveal, card } = this.props;
        if (isReveal) {
            return (
                <img src={card.images.png} alt={card.code} className="card-image" />
            )
        }

        return (
            <Card className="card" >

                <CardContent >
                    <Help />
                </CardContent>
            </Card>
        );
    }
}

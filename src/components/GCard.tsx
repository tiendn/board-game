import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Card, CardContent, CardMedia } from '@material-ui/core';
import { Help } from '@material-ui/icons';
import { CardEntity } from '../entities/Card';
import CardDefault from '../assets/card-default.png'

interface Props {
    isReveal: boolean,
    card: CardEntity,
    style?: any
}

export default class GCard extends React.PureComponent<Props>{
    render() {
        const { isReveal, card, style } = this.props;
        if (isReveal) {
            return (
                <img src={card.images.png} alt={card.code} style={style} className="card-image" />
            )
        }
        return <img src={CardDefault} alt={card.code} style={style} className="card-image" />
        // return (
        //     <Card className="card" >

        //         <CardContent >
        //         <img src={card.images.png} alt={card.code} className="card-image" />
        //         </CardContent>
        //     </Card>
        // );
    }
}

import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../../../ui/Card';
import Button from '../../../../ui/Button'

import './index.css';


class Media extends React.Component {

    render() {
        const { type, media } = this.props;

        return (

            <div className="media-div">
                <Card>
                    <img className="media-image" src={media.image} alt="Loading..." />
                    <h3 style={{ textAlign: 'center' }}>
                        {media.title ? media.title : media.name}
                    </h3>
                    <p style={{ color: "#05386b", textAlign: "center" }}>
                        <b>Rating:</b>
                        <i className="fa fa-star-half-o" aria-hidden="true"></i>
                        {media.vote_average}/10
                            </p>
                    <Link style={{ padding: "20px", textAlign: "center" }} to={`/description/${type}/${media.id}`}>
                        <Button>Know More <i className="fa fa-angle-right" aria-hidden="true"></i></Button>
                    </Link>
                    <p>&nbsp;</p>
                </Card>
            </div>
        )
    }
}
export default Media;

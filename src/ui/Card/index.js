import React from 'react';

import './index.css';

class Card extends React.Component{
    render(){
        return (
            <div className="card">
                {this.props.children}
            </div>
        )
    }
}
export default Card;
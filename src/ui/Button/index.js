import React from 'react';

import './index.css';

class Button extends React.Component{
    render(){
        return (
            <button onClick={this.props.onClick} className="custom-button">
                {this.props.children}
            </button>
        )
    }
}
export default Button;
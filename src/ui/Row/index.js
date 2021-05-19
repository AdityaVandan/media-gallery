import React from 'react';

import './index.css';

class Row extends React.Component{
    render(){
        return (
            <div className="row">
                {this.props.children}
            </div>
        )
    }
}
export default Row;
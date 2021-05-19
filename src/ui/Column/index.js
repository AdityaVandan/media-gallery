import React from 'react';

import './index.css';

class Column extends React.Component{
    render(){
        return (
            <div className="column">
                {this.props.children}
            </div>
        )
    }
}
export default Column;
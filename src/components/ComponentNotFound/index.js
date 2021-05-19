import React from 'react';
import {Link} from 'react-router-dom';

import Navigationbar from '../NavigationBar';
import Button from '../../ui/Button';

import './index.css';

class ComponentNotFound extends React.Component{

    render(){
        return (
            <div className="component-not-found-error404">
                <Navigationbar />
                <div className="component-not-found-heading-section">
                <h1>404 not found</h1>
                <Link to="/"><Button>Go back home</Button></Link>
                </div>
            </div>
        )
    }
}
export default ComponentNotFound;
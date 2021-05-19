import React from 'react';
import {Switch ,BrowserRouter, Route} from 'react-router-dom'

import Home from './views/Home';
import Description from './views/Description';
import ComponentNotFound from './components/ComponentNotFound';

import './App.css';


class App extends React.Component{

    render(){
        return (
            <div className="app-background">
                <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/" exact component={Home}></Route>
                        <Route path="/home" component={Home}></Route>
                        <Route path="/description/:media/:id" component={Description}></Route>
                        <Route path="**" component={ComponentNotFound}></Route>
                    </Switch>
                </div>
                </BrowserRouter>
            </div>
        )
    }
}
export default App;
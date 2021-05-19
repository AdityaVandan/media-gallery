import React from 'react';

import NavigationBar from '../../components/NavigationBar';
import MovieSection from './MovieSection';
import ShowSection from './ShowSection';
import SECTION_TYPE from '../../constants/home-constants';

import './index.css';
import { Route } from 'react-router-dom';


class Home extends React.Component {

    state = {
        currentMedia: ""
    }

    componentDidMount() {
        // selecting default media on the basis of url
        let path = this.props.location.pathname;
        if (path.includes("movie")) {
            this.setState({
                currentMedia: SECTION_TYPE.MOVIE
            });
        }
        else if (path.includes("show")) {
            this.setState({
                currentMedia: SECTION_TYPE.SHOW
            });
        }
    }

    render() {
        const { currentMedia } = this.state;
        return (
            <div className="home-div">
                <NavigationBar />
                <div className="home-tab-div">
                    <span id="movie" className={currentMedia === SECTION_TYPE.MOVIE ? "home-tab-selected" : "home-tab"} onClick={this.selectMedia}>Movies</span>
                    <span id="show" className={currentMedia === SECTION_TYPE.SHOW ? "home-tab-selected" : "home-tab"} onClick={this.selectMedia}>TV shows</span>
                </div>
                <Route path="/home/movie" component={MovieSection} />
                <Route path="/home/show" component={ShowSection} />
            </div>
        )
    }


    // choosing which component to render movie or show
    selectMedia = (event) => {

        if (this.state.currentMedia === event.target.id) {
            return;
        }

        let element = event.target.id;
        if (element === "movie") {
            this.props.history.push('/home/movie');
            this.setState({
                ...this.state,
                currentMedia: SECTION_TYPE.MOVIE
            });
        } else {
            this.props.history.push('/home/show');
            this.setState({
                ...this.state,
                currentMedia: SECTION_TYPE.SHOW
            });
        }
    }
}
export default Home;

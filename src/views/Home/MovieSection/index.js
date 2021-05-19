import React from 'react';

import SearchBar from '../../../components/SearchBar';
import Carousel from '../../../components/Carousel';
import ListMedia from "../ListMedia";

import api_constants from '../../../constants/constants';

import './index.css';

class MovieSection extends React.Component{

    render(){

        return (
            <div className="movie-section">
                <Carousel history={this.props.history} api = {api_constants.TRENDING_MOVIE_API_END} />
                <SearchBar type="movie" history={this.props.history} api={api_constants.SEARCH_MOVIE_API_END} />
                <ListMedia type="movie" api={api_constants.ALL_POPULAR_MOVIE_API_END} />
            </div>
        )
    }
}
export default MovieSection;
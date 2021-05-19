import React from 'react';

import SearchBar from '../../../components/SearchBar';
import Carousel from '../../../components/Carousel';
import ListMedia from '../ListMedia';

import api_constants from '../../../constants/constants';

import './index.css';

class ShowSection extends React.Component{

    render(){

        return (
            <div className="show-section">
                <Carousel history={this.props.history} api = {api_constants.TRENDING_SHOW_API_END} />
                <SearchBar type="show" history={this.props.history} api = {api_constants.SEARCH_SHOW_API_END} />
                <ListMedia type="show" api = {api_constants.ALL_POPULAR_SHOW_API_END} />
            </div>
        )
    }
}
export default ShowSection;
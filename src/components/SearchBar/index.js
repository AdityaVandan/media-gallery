import React from 'react';
import axios from 'axios';

import './index.css';
import api_constants from '../../constants/constants';

class SearchBar extends React.Component {

    state = { searchInput: "" };
    timer = null;

    render() {

        return (
            <div>
                <div className="search-bar">
                    <input id="search-input" className="search-input" placeholder="search media"
                        onChange={this.onType} list="searchSuggestions" value={this.state.searchInput} />

                    <datalist id="searchSuggestions">
                        {this.state.mediaList ?
                            <div style={{ border: "1px solid black", padding: "10px", backgroundColor: "white" }}>
                                {this.state.mediaList.map((media, index) => {
                                    return (
                                        <option key={`list-item-${media.id}`} value={media.name ? media.name : media.title}></option>
                                    )
                                })}
                            </div>
                            : null}
                    </datalist>

                    <button type="button" className="search-button" onClick={this.getDescription}>Search</button>
                </div>
            </div>
        )
    }

    onType = (event) => {

        // for two-way binding
        let query = event.target.value;
        this.setState({
            ...this.state,
            searchInput: query,
            mediaList: null
        });

        // for debouncing
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {

            // getting suggestions from api by query string if user has stopped typing
            let url = `${this.props.api}`;
            axios.get(url, {
                params: {
                    api_key: api_constants.API_KEY,
                    page: 1,
                    query: query
                }
            }).then(res => {
                let mediaList = res.data.results;
                this.setState({
                    ...this.state,
                    mediaList: mediaList
                });
            }).catch(err => {
                console.log(err)
            });
        }, 1000);
    }

    getDescription = () => {

        // if media exists then get more details on the description page
        if (this.state.mediaList) {
            let searchInput = this.state.searchInput;
            let index = this.state.mediaList.findIndex(media => {
                return media.name === searchInput || media.title === searchInput;
            });
            let id = this.state.mediaList[ index ].id;
            this.props.history.push(`/description/${this.props.type}/${id}`);
        }
    }


}
export default SearchBar;

import React from 'react';
import axios from 'axios';

import Media from './Media';
import './index.css';
import api_constants from '../../../constants/constants';

class ListMedia extends React.Component {
    state = {
        page: 1,
        mediaRowlist: []
    };

    componentDidMount = () => {
        // adding listener while component mounting for infinite scroll
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        // removing listeners while unmounting for not leaking memory
        window.removeEventListener('scroll', this.handleScroll);
    }


    render() {
        const { mediaRowlist } = this.state
        return (
            <div className="listmedia" id="listmedia">
                { mediaRowlist ? mediaRowlist.map((mediaPair, index) => {
                    return (
                        <div key={`${mediaPair[ 0 ].id}-${index}row`} className="listmedia-row">
                            {mediaPair.map((media, index) => {
                                return (
                                    <div key={`${media}#${index}`} className="listmedia-column">
                                        <Media type={this.props.type} media={media} />
                                    </div>
                                )
                            })}
                        </div>
                    )
                }) : null}
            </div>
        )
    }

    // function for infinite scroll
    handleScroll = () => {
        // condition is that if the height + length that has been scrolled by the user is less that total height then return
        if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight) {
            return;
        }
        this.loadMore();
    }

    // loads data of more media in the state
    loadMore = () => {

        // requesting data of page number which is in state
        let url = `${this.props.api}?api_key=${api_constants.API_KEY}`;
        axios.get(url, {
            params: {
                api_key: api_constants.API_KEY,
                page: this.state.page
            }
        }).then((res) => {

            // increments the value of page for next call
            this.setState({
                page: this.state.page + 1
            });

            let medialist = res.data.results;
            // choosing the image which is available for display and adding it in the media object
            for (let i = 0; i < medialist.length; i++) {
                if (medialist[ i ].backdrop_path !== null) {
                    medialist[ i ].image = `https://image.tmdb.org/t/p/original${medialist[ i ].backdrop_path}`;
                }
                else {
                    medialist[ i ].image = `https://image.tmdb.org/t/p/original${medialist[ i ].poster_path}`;
                }
            }
            let newMediaList = [];
            let pair = [];
            for (let i = 0; i < medialist.length; i++) {
                pair.push(medialist[ i ]);
                if (i % 2 === 1) {
                    newMediaList.push(pair);
                    pair = [];
                }
            }
            let mediaRowlist = this.state.mediaRowlist.concat(newMediaList);
            this.setState({
                ...this.state,
                mediaRowlist: mediaRowlist
            });
        }).catch((err) => {
            console.log(err);
        });
    }


}

export default ListMedia;

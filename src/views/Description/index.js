import React from 'react';
import axios from 'axios';
import lscache from 'lscache';

import NavigationBar from '../../components/NavigationBar';
import Button from '../../ui/Button';
import api_constants from '../../constants/constants';

import './index.css';


class Description extends React.Component {

    state = {
        name: "loading...",
        image: "",

    }

    componentDidMount = () => {
        this.requestMediaData();
    }

    render() {
        const { genres, overview, original_title, poster, image, runtime, vote_average, vote_count, release_date, homepage, production_companies, budget, revenue } = this.state;
        let textColor = "#05386b";

        return (
            <div>
                <NavigationBar />
                <div className="description-center">
                    <div className="description-div">
                        <img className="description-poster" src={poster} alt="loading..." />
                    </div>
                    <div>
                        <div className="description-div">
                            <h2 style={{ color: textColor, }}>{original_title}</h2>
                            <p><b style={{ color: textColor }}>Synopsis:</b> {overview}</p>
                            {genres ?
                                <div>
                                    <h4 style={{ color: textColor }}>Genres</h4>
                                    <ul>
                                        {genres.map((genre, index) => { return (<li key={`genre${genre.id}`}>{genre.name}</li>) })}
                                    </ul>
                                </div> : null}
                            {runtime ?
                                <p><b style={{ color: textColor }}>Runtime:</b> {`${runtime} min`}</p>
                                : null}
                            {vote_count ?
                                <p><b style={{ color: textColor }}>Voters:</b> {`${vote_count} people`}</p> :
                                null}
                            {vote_average ? <p><b style={{ color: textColor }}>Rating:</b> {`${vote_average}/10`}</p>
                                : null}
                            {release_date ?
                                <p><b style={{ color: textColor }}>release_date:</b> {release_date}</p>
                                : null}
                        </div>
                    </div>
                    <div>
                        <div className="description-div">
                            {homepage ?
                                <p><b style={{ color: textColor }}>Website:</b> <a href={homepage}>{this.state.homepage}</a></p>
                                : null}
                            <h4 style={{ color: textColor }}>Media Images:</h4>
                            {<ul>
                                <li><a href={poster}>Image 1</a></li>
                                <li><a href={image}>Image 2</a></li>
                            </ul>}
                            {production_companies ?
                                <div>
                                    <h4 style={{ color: textColor }}>Production Companies</h4>
                                    <ul>
                                        {production_companies.map((company, index) => {
                                            return (<li key={`company${company.id}`}>{company.name}</li>
                                            )
                                        }
                                        )}
                                    </ul>
                                </div>
                                : null}
                            {budget ?
                                <p><b style={{ color: textColor }}>Budget:</b> {`$${budget}`}</p>
                                : null}
                            {revenue ?
                                <p><b style={{ color: textColor }}>Revenue:</b> {`$${revenue}`}</p>
                                : null}
                            <Button onClick={this.back}><i className="fa fa-left"></i>back to home</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    requestMediaData = () => {

        let mediaType = this.props.match.params.media;
        let id = this.props.match.params.id;
        let url;

        //checking cache
        let cacheValue = lscache.get(mediaType + id);
        if (cacheValue) {
            this.setState({
                ...this.state,
                ...cacheValue
            });
            return;
        }

        // choosing which api to call on the basis of whether the media is movie or a tv show
        if (mediaType === "movie") {
            url = `${api_constants.MOVIE_DESCRIPTION_API_END}${id}?api_key=${api_constants.API_KEY}`;
        }
        else if (mediaType === "show") {
            url = `${api_constants.SHOW_DESCRIPTION_API_END}${id}?api_key=${api_constants.API_KEY}`;
        }
        else {
            this.props.history.push("/");
        }

        //requesting data from relevant api
        axios.get(url).then(res => {
            let media = res.data;
            media.poster = `https://image.tmdb.org/t/p/original/${media.poster_path}`;
            media.image = `https://image.tmdb.org/t/p/original/${media.backdrop_path}`;

            // caching description
            lscache.set(mediaType + id, media, 1);
            this.setState({
                ...this.state,
                ...media
            });
        }).catch(err => {
            console.log(err);
        });

    }
    back = () => {
        // to go back to home
        this.props.history.push("/home/movie");
    }

}

export default Description;

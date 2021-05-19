import React from 'react';
import axios from 'axios';

import api_constants from "../../constants/constants";
import dummyImages from "../../constants/dummy-images";

import './index.css';

class Carousel extends React.Component {

    constructor(props) {
        super(props);

        //adding dummy images as default
        this.state = {
            trendingMedia: dummyImages
        };
    }

    componentDidMount() {

        //fetches images for carousel to display
        this.fetchData();

        // carasouel movement after every 5 secs
        let clearKey = setInterval(this.next, 5000);
        this.setState({
            ...this.state,
            clearKey
        })
    }

    componentWillUnmount() {
        // clearing carasouel movement
        if (this.state.clearKey) {
            clearInterval(this.state.clearKey);
        }
    }

    render() {
        return (
            <div className="carousel-section">
                <div className="carousel-wrapper">
                    <div className="carousel">
                        {this.state.trendingMedia.map((cn, index) => {
                            return (
                                <img id={"img" + index} key={"img" + index}
                                    className={cn.className} src={cn.image}
                                    onClick={this.onImageClick.bind(this, cn.id)}
                                    alt="https://sf-applications.s3.amazonaws.com/Bear/wallpapers/05/july-2020-wallpaper_desktop-3840x1600.png" />
                            )
                        }
                        )}
                        <div className="carousel-button--next" onClick={this.next}></div>
                        <div className="carousel-button--prev" onClick={this.previous}></div>
                    </div>
                </div>
            </div>
        )
    }

    fetchData = () => {

        let url = this.props.api + "?api_key=" + api_constants.API_KEY
        axios.get(url).then(res => {

            //preparing images for carousel
            let trendingMedia = res.data.results;
            for (let i = 0; i < trendingMedia.length; i++) {
                trendingMedia[ i ].className = "carousel-photo";
                trendingMedia[ i ].image = "https://image.tmdb.org/t/p/original" + trendingMedia[ i ].backdrop_path;
            }
            trendingMedia[ trendingMedia.length - 1 ].className = "carousel-photo prev";
            trendingMedia[ 0 ].className = "carousel-photo active";
            trendingMedia[ 1 ].className = "carousel-photo next";

            this.setState({
                ...this.state,
                trendingMedia: trendingMedia
            });
        }).catch((err) => {
            this.setState({ ...this.state, msg: "error" });
        });
    }

    next = () => {
        // taking relevant data from state
        let totalImages = this.state.trendingMedia.length;
        let obj = JSON.parse(JSON.stringify(this.state));
        let trendingMedia = obj.trendingMedia;
        // finding current image
        let index = this.state.trendingMedia.findIndex(media => media.className.includes("active"));

        // adding default css
        for (let i = 0; i < totalImages; i++) trendingMedia[ i ].className = "carousel-photo";

        // adding css for movement
        if (index === (totalImages - 2)) {
            trendingMedia[ index ].className = "carousel-photo prev";
            trendingMedia[ index + 1 ].className = "carousel-photo active";
            trendingMedia[ 0 ].className = "carousel-photo next";
        } else if (index === (totalImages - 1)) {
            trendingMedia[ index ].className = "carousel-photo prev";
            trendingMedia[ 0 ].className = "carousel-photo active";
            trendingMedia[ 1 ].className = "carousel-photo next";
        } else {
            trendingMedia[ index ].className = "carousel-photo prev";
            trendingMedia[ index + 1 ].className = "carousel-photo active";
            trendingMedia[ index + 2 ].className = "carousel-photo next";
        }

        this.setState({ ...this.state, trendingMedia: trendingMedia });
    }

    previous = () => {
        // taking relevant data from state
        let totalImages = this.state.trendingMedia.length;
        let obj = JSON.parse(JSON.stringify(this.state));
        let trendingMedia = obj.trendingMedia;

        //finding current image
        let index = this.state.trendingMedia.findIndex(media => media.className.includes("active"));

        //adding default
        for (let i = 0; i < totalImages; i++) trendingMedia[ i ].className = "carousel-photo";

        // adding css for movement
        if (index === 1) {
            trendingMedia[ index ].className = "carousel-photo next";
            trendingMedia[ index - 1 ].className = "carousel-photo active";
            trendingMedia[ totalImages - 1 ].className = "carousel-photo prev";
        } else if (index === 0) {
            trendingMedia[ index ].className = "carousel-photo next";
            trendingMedia[ totalImages - 1 ].className = "carousel-photo active";
            trendingMedia[ totalImages - 2 ].className = "carousel-photo prev";
        } else {
            trendingMedia[ index ].className = "carousel-photo next";
            trendingMedia[ index - 1 ].className = "carousel-photo active";
            trendingMedia[ index - 2 ].className = "carousel-photo prev";
        }
        this.setState({ ...this.state, trendingMedia: trendingMedia });
    }

    onImageClick = (id) => {

        //chosing between which api to call on the basis of current url
        if (this.props.api.includes("tv")) {
            this.props.history.push(`/description/show/${id}`);
        } else {
            this.props.history.push(`/description/movie/${id}`);
        }
        // this.props.history.push(`/description/`)
    }

}
export default Carousel;

const dummyImages = (() => {
    let trendingMedia = [];
    let images = ["https://sf-applications.s3.amazonaws.com/Bear/wallpapers/05/july-2020-wallpaper_desktop-3840x1600.png","https://wallpapercave.com/wp/wp2646303.jpg","http://placekitten.com/1600/900","http://placekitten.com/g/1600/900","https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"];
    for(let i=0;i<images.length;i++) trendingMedia.push({image: images[i],className:"carousel-photo"});
    trendingMedia[trendingMedia.length-1].className="carousel-photo prev";
    trendingMedia[0].className = "carousel-photo active";
    trendingMedia[1].className = "carousel-photo next";
    return trendingMedia;
})();
export default dummyImages
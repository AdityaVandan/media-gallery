
const handleScroll = (loadMore) => {

  return () => {
    // condition is that if the height + length that has been scrolled by the user is less that total height then return
    if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight) {
      return;
    }
    loadMore();
  };

}

export default handleScroll;

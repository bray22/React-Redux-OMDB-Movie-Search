const FeaturedMovie = (props) => {
  const watchList = JSON.parse(localStorage.getItem('watchList'));
  const { Title, Poster, Plot, Director, Writer } = props.movie;
  return (
    <div className="featured-movie-wrapper">
      <div className="top">
        <div className="left">
          <img src={Poster} width="200" />
        </div>
        <div className="right">
          
          
          <h3>{Title}</h3>
          <p>{Plot}</p>
          <hr />
          Director: {Director}
          <hr />
          Writers: {Writer}
          
          
        </div>
        
      
      </div>
      <div className="bottom">
        <div className="left">
        AWARDS
        </div>
        <div className="right">
        OTHER STUFF
        </div>

      </div>
    </div>
  );
};

export default FeaturedMovie;

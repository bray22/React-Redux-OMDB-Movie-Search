import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle} from '@fortawesome/free-solid-svg-icons';

const FeaturedMovie = (props) => {
  const { Title, Poster, Plot, Director, Writer, Year, Awards, Ratings, Actors } = props.movie;
  return (
    <div className="featured-movie-wrapper">
      <div className="top">
        <div className="left">
          <div className="featured">Recommended</div>
          <img src={Poster} alt={Title} width="200" />
        </div>
        <div className="right">
          <h3>
            {Title} - {Year} 
            <FontAwesomeIcon onClick={() => props.addMovieToWatchList(props.movie)} className="plus" icon={faPlusCircle} /></h3>
          <p>{Plot}</p>
          <hr />Starring: {Actors}
          <hr />Director: {Director}
          <hr />Writers: {Writer}
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <h3>AWARDS</h3>
          <p>{Awards}</p>
        </div>
        <div className="right">
          <h3>RATINGS</h3>
            {Ratings && Ratings.map( (rating, i) => {
              return <p key={i}>{rating.Source}: {rating.Value}</p>
            })}
        </div>
      </div>
    </div>
  );
};

export default FeaturedMovie;

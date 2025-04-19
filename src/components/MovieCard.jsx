import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <h3>{movie.title}</h3>
      <Link to={`/movie/${movie.id}`}>View Movie</Link>
    </div>
  );
};

export default MovieCard;

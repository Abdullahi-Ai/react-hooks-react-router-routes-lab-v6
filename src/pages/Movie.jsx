import { useParams } from "react-router-dom";

const Movie = () => {
  const { id } = useParams(); 
  const movie = { 
    title: "Inception", 
    time: "148 minutes", 
    genres: ["Sci-Fi", "Thriller"] 
  };

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>Time: {movie.time}</p>
      {movie.genres.map((genre, index) => (
        <span key={index}>{genre}</span>
      ))}
    </div>
  );
};

export default Movie;

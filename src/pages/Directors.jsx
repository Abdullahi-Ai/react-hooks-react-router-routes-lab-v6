import NavBar from "../components/NavBar";

const directors = [
  {
    name: "Christopher Nolan",
    movies: ["Inception", "The Dark Knight", "Dunkirk"],
  },
  {
    name: "Quentin Tarantino",
    movies: ["Pulp Fiction", "Kill Bill", "Django Unchained"],
  },
];

const Directors = () => {
  return (
    <>
      <NavBar />
      <h1>Directors Page</h1>
      {directors.map((director) => (
        <article key={director.name}>
          <h2>{director.name}</h2>
          <ul>
            {director.movies.map((movie) => (
              <li key={movie}>{movie}</li>
            ))}
          </ul>
        </article>
      ))}
    </>
  );
};

export default Directors;

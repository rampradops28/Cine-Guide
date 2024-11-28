import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import backup from '../assets/backup.jpeg';
import { convertMinutes } from "../utils/utils";

export const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const params = useParams();
  const key = import.meta.env.VITE_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${params.id}?api_key=${key}`;
  
  // Use poster_path from the movie object, fallback to backup image
  const image = movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : backup;

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        setMovie(jsonData); // Set movie with the fetched data
      } catch (err) {
        console.error("Error fetching movie details:", err.message);
      }
    }

    fetchMovies();
  }, []); // Dependency array ensures fetch runs when URL changes

  useEffect(() => {
    if (movie.title) {
      document.title = movie.title;
    }
  }, [movie.title]); // Update document title only when movie.title is set

  return (
    <main className="container">
      {movie.title ? ( // Render only when movie data is available
        <>
          <p className="text-danger py-2 border-bottom mb-3">{movie.title}</p>
          <div className="row">
            <div className="col-md-4">
              <img src={image} alt={movie.title || "Movie poster"} className="img-fluid img-thumbnail" />
            </div>
            <div className="col-md-8">
              <h3 className="text-primary">{movie.title}</h3>
              <p className="mt-3">{movie.overview}</p>

              {movie.genres && (
                <p className="d-flex gap-3">
                  {movie.genres.map((genre) => (
                    <span key={genre.id} className="badge bg-danger">
                      {genre.name}
                    </span>
                  ))}
                </p>
              )}

              <p className="mt-2">
                <i className="bi bi-star-fill text-warning"></i> {movie.vote_average} |
                 <i className="bi bi-people-fill text-success"></i> {movie.vote_count} reviews
              </p>

              <table className="table table-bordered w-50 mt-2">
                  <tbody>
                    <tr>
                      <th>Runtime</th>
                      <td>{convertMinutes(movie.runtime)}</td>
                    </tr>
                    <tr>
                      <th>Budget</th>
                      <td>{movie.budget}</td>
                    </tr>
                    <tr>
                      <th>Revenue</th>
                      <td>{movie.revenue}</td>
                    </tr>
                    <tr>
                      <th>Release Date</th>
                      <td>{movie.release_date}</td>
                    </tr>
                  </tbody>
              </table>

              <a className="btn btn-warning" href={`https://www.imdb.com/title/${movie.imdb_id}`}>View in IMDB</a>
            </div>
          </div>
        </>
      ) : (
        <p>Loading movie details...</p> // Show a loader until movie data is fetched
      )}
    </main>
  );
};

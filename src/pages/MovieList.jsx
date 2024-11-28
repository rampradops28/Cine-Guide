import { useEffect } from "react";
import { Card } from "../components";
import { useNavigate } from "react-router-dom";
import UseFetch from "../hooks/UseFetch";

export const MovieList = ({ title, apiPath }) => {
  const { data: movies, error } = UseFetch(apiPath); // Handle errors too
   
  useEffect(() => {
    document.title = title;
  }, [title]);

  const navigate = useNavigate();

  return (
    <main className="container" style={{ marginTop: "50px" }}>
      {title === "Your Guide To Great Movies" && (
        <div className="bg-body-tertiary p-5 border my-5">
          <h3 className="text-primary">Welcome to MovieHunt</h3>
          <p className="text-lead">
            Discover new movies you&apos;ll love! Our website helps you find
            movies you'll love. Just tell us what you like, and we'll suggest
            films based on your preferences. Whether you're into action,
            romance, comedy, or any other genre, we've got recommendations for
            you. Explore new releases, hidden gems, and timeless classics.
            Start your movie journey with us today!
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/movie/upcoming")}
          >
            Explore Now
          </button>
        </div>
      )}

      <p className="text-danger py-2 border-bottom">{title}</p>

      {error ? (
        <p className="text-danger">Error: {error}</p>
      ) : movies.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 py-3">
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>Loading movies...</p>
      )}
    </main>
  );
};

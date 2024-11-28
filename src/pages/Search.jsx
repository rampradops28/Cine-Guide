import { useEffect } from "react";
import { Card } from "../components";
import { useSearchParams } from "react-router-dom";
import UseFetch from "../hooks/UseFetch";

export const Search = ({apiPath}) => {

  const [searchParams] = useSearchParams();
  const queryTerm = searchParams.get("q");
  const {data: movies} = UseFetch(apiPath , queryTerm);

  useEffect(() => {
    document.title = `search result for ${queryTerm}`;
  })
  return (
    <main className="container">
      <h5 className="text-danger py-2 border-bottom">
        {movies.length ==0 ? `No result found for ${queryTerm}` :`Result for ${queryTerm}`}
        </h5>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 py-3">
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
    </main>
  )
}

 
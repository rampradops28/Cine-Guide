import { Route, Routes } from "react-router-dom"
import  { MovieList, MovieDetails, PageNotFound, Search } from "../pages";


export const AllRoutes = () => {
  return (
     <Routes>
         <Route path="/" element={ <MovieList title="Your Guide To Great Movies" apiPath="movie/now_playing"/> } />
         <Route path="movie/top" element={ <MovieList title="Top Rated Movies" apiPath="movie/popular"/> } />
         <Route path="movie/popular" element={ <MovieList title="Popular Movies" apiPath="movie/top_rated"/> } />
         <Route path="movie/upcoming" element={ <MovieList title="Upcoming Movies" apiPath="movie/upcoming"/> } />
          <Route path="movie/:id" element={ <MovieDetails /> } />
         <Route path="search" element={ <Search apiPath="search/movie"/> } />
         <Route path="*" element={ <PageNotFound title="Page Not Found" /> } />

     </Routes>
  )
}
 
import pagenotfound from '../assets/pagenotfound.avif'
import { Link } from 'react-router-dom'
export const PageNotFound = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center flex-column gap-3">
      <img src={pagenotfound} alt="" className="img-fluid notimg" />
       <p className="text-center">
         <Link to="/" className="btn btn-danger">Goto Home Page</Link>
       </p>
    </div>
  )
}

 
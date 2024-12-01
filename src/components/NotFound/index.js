import './index.css'
import {Link} from 'react-router-dom'
const NotFound = () => {
  return (
    <div className="notFound">
      <h1>Lost Your Way?</h1>
      <p>
        we are sorry the page you requested could not be foundPlease go back to
        the homepage
      </p>
      <button>
        <Link to="/">Go to Home</Link>
      </button>
    </div>
  )
}

export default NotFound
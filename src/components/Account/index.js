
import './index.css'
import Coookies from 'js-cookie'
import Footer from '../Footer'
import {useNavigate} from "react-router-dom"
const Account = props => {
const Navigate=useNavigate()
  const logOut = () => {
    Coookies.remove('jwt_token')
   Navigate("/login")
  }
  return (
    <div className="account">
      <div className="account-card">
        <h1>Account</h1>
        <hr width="100%" />
        <div className="d-flex">
          <p>Member ship</p>
          <div>
            <p>bondabhargav@gmail.com</p>
            <p>Password :{'*******'}</p>
          </div>
        </div>
        <hr width="100%" />
        <div className="d-flex">
          <p>plan Details</p>
          <p>Premium</p>
          <p className="ultraHD">Ultra HD</p>
        </div>
        <button onClick={logOut}>LogOut</button>
      </div>
      <Footer />
    </div>
  )
}

export default Account


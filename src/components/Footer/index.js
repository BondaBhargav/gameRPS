import './index.css'
import {FaGoogle, FaInstagram, FaYoutube, FaTwitter} from 'react-icons/fa'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="display-flex">
        <FaGoogle />
        <FaTwitter />
        <FaInstagram />
        <FaYoutube />
      </div>
      <p>Contact us</p>
    </footer>
  )
}
export default Footer


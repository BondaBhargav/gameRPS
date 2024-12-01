import './index.css'
import {FaSearch} from 'react-icons/fa'
import {BiMenu} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'

import {useState} from 'react'
import {BsArrowBarUp} from 'react-icons/bs'
const Header = () => {
  const [state, setState] = useState(false)
  return (
    <>
      <div className="dis-sm">
        <div className="Header-cont-sm">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dtc4lwuck/image/upload/v1732869802/cfxrxlmg2tnkssrcmtzj.png"
              alt="website logo"
            />
          </Link>
          <div className="head-right">
            <Link to="/search">
              <HiOutlineSearch
                
              />
            </Link>
            {!state && (
              <BiMenu
                className="sm-logo-icon"
                onClick={() => {
                  setState(prev => !prev)
                }}
              />
            )}
          </div>
        </div>
        {state && (
          <div className="sm-Hambuger">
            <ul className="d-flex">
              <li>
                <Link to="/" className="Link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/popular" className="Link">
                  Popular
                </Link>
              </li>
              <li>
                <Link to="/popular" className="Link">
                  Account
                </Link>
              </li>
            </ul>

            <BsArrowBarUp
              onClick={() => {
                setState(prev => !prev)
              }}
            />
          </div>
        )}
      </div>
      <div className="Header-cont-lg">
        <div className="d-flex">
          <Link to="/">
            {' '}
            <img
              src="https://res.cloudinary.com/dtc4lwuck/image/upload/v1732869802/cfxrxlmg2tnkssrcmtzj.png"
              className="websitelogoimg"
              alt="website logo"
            />
          </Link>
          <ul className="d-flex">
            <li>
              <Link to="/" className="Link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/popular" className="Link">
                Popular
              </Link>
            </li>
          </ul>
        </div>
        <div className="d-flex">
          <Link to="/account">
            <img
              src="https://res.cloudinary.com/dtc4lwuck/image/upload/v1732026476/frthtjj1nkbbqdapvqeu.png"
              alt="profile"
            />
          </Link>

          <Link to="/search">
            {' '}
            <HiOutlineSearch
              className="search-icon-lg"
              
            />
          </Link>
        </div>
      </div>
    </>
  )
}

export default Header

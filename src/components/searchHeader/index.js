import './index.css'
import {FaSearch} from 'react-icons/fa'
import {HiOutlineSearch} from 'react-icons/hi'
import {BiMenu} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import {BsArrowBarUp} from 'react-icons/bs'
import {useState} from 'react'

const SearchHeader = props => {
  const {getResponseFromApi} = props
  const [state, setState] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const searchResult = event => {
    setSearchInput(event.target.value)
  }

  const onClickSearch = () => {
    getResponseFromApi(searchInput)
  }

  const onkeyDown = event => {
    if (event.key === 'Enter') {
      getResponseFromApi(searchInput)
    }
  }
  return (
    <>
      <div className="dis-sm">
        <div className="Header-cont-sm">
          <Link to="/">
            <h1 className="header-logo">MOVIE</h1>
          </Link>
          <div className="head-right">
            <div className="search-input">
              <input
                type="search"
                className="searchInput"
                onChange={searchResult}
                onKeyDown={onkeyDown}
              />
              <HiOutlineSearch onClick={onClickSearch} />
            </div>

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
            {' '}
            <Link to="/" className="Link">
              <p>Home</p>
            </Link>{' '}
            <Link to="/popular" className="Link">
              <p>Popular</p>
            </Link>
            <Link to="/account" className="Link">
              <p>Account</p>
            </Link>
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
            <h1 className="header-logo">MOVIE</h1>
          </Link>
          <Link to="/" className="Link">
            <p>Home</p>
          </Link>{' '}
          <Link to="/popular" className="Link">
            <p>Popular</p>
          </Link>
        </div>
        <div className="d-flex">
          <div className="search-input">
            <input
              type="search"
              className="searchInput"
              value={searchInput}
              onChange={searchResult}
              onKeyDown={onkeyDown}
            />
            <HiOutlineSearch onClick={onClickSearch} testid="searchButton" />
          </div>
          <Link to="/account">
            <img
              src="https://res.cloudinary.com/dtc4lwuck/image/upload/v1732026476/frthtjj1nkbbqdapvqeu.png"
              alt="profilr"
            />
          </Link>
        </div>
      </div>
    </>
  )
}

export default SearchHeader

import './index.css'
import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import {ProgressBar} from 'react-loader-spinner';
import {Link} from 'react-router-dom'

import {FaGoogle, FaInstagram, FaYoutube, FaTwitter} from 'react-icons/fa'
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Popular = () => {
  const [state, setState] = useState({
    dataList: [],
    apiStatus: apiStatusConstants.initial,
  })
  const getResponseFromApi = async () => {
    const jwtToken = Cookies.get('jwt_token')

    setState(prev => ({
      ...prev,
      apiStatus: apiStatusConstants.inProgress,
    }))
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
    
      const {results} = fetchedData
      const modifiedData = results.map(each => ({
        title: each.title,
        id: each.id,

        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
      }))

      setState(prev => ({
        dataList: modifiedData,
        apiStatus: apiStatusConstants.success,
      }))
    } else {
      setState(prev => ({
        ...prev,
        apiStatus: apiStatusConstants.failure,
      }))
    }
  }

  const loadingView = () => {
    return (
      <div className="loadingview">
        <div className="loader-container" testid="loader">
        <ProgressBar
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="progress-bar-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />

        </div>
      </div>
    )
  }

  const renderFailureView = () => {
    return (
      <div className="failure-View">
        <img
          src="https://res.cloudinary.com/dtc4lwuck/image/upload/v1732363283/enulcmqxezjuuirkwo6d.png"
          alt="failure view"
        />
        <h1>something Went Wrong please try Again</h1>
        <button
          onClick={() => {
            getResponseFromApi()
          }}
        >
          Try again
        </button>
      </div>
    )
  }

  const renderSucessview = () => {
    return (
      <>
        <ul className="success-View">
          {state.dataList.map(eachItem => (
            <li key={eachItem.id} className="popular-list">
              <Link to={`/movies/${eachItem.id}`} className="popular-Link">
                <img
                  src={eachItem.posterPath}
                  alt="populariamge"
                  className="popular-img-item"
                />
              </Link>
            </li>
          ))}
        </ul>
        <footer className="footer">
          <div className="display-flex">
            <FaGoogle />
            <FaTwitter />
            <FaInstagram />
            <FaYoutube />
          </div>
          <p>Contact us</p>
        </footer>
      </>
    )
  }
  const renderFinalStatus = () => {
    const {apiStatus} = state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSucessview()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return loadingView()
      default:
        return null
    }
  }

  useEffect(() => {
    getResponseFromApi()
  }, [])

  return (
    <div className="popular">
      <Header />
      {renderFinalStatus()}
    </div>
  )
}

export default Popular

import './index.css'
import Header from '../Header'
import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import ReactSlick from '../ReactSlick'
import {ProgressBar} from 'react-loader-spinner';
import {FiAlertTriangle} from 'react-icons/fi'
import Footer from '../Footer'
const Home = () => {
  const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
  }

  const [state, setState] = useState({
    mainPosterdataList: [],
    originaldataList: [],
    topRatedDataList: [],

    mainposterapiStatus: apiStatusConstants.initial,
    topRatedApiSatus: apiStatusConstants.initial,
    orginalApistatus: apiStatusConstants.initial,
  })

  const getApifortopRated = async () => {
    const jwtToken = Cookies.get('jwt_token')

    setState(prev => ({
      ...prev,
      topRatedApiSatus: apiStatusConstants.inProgress,
    }))
    const apiUrl = 'https://apis.ccbp.in/movies-app/top-rated-movies'
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
        ...prev,
        topRatedDataList: modifiedData,
        topRatedApiSatus: apiStatusConstants.success,
      }))
    } else {
      setState(prev => ({
        ...prev,
        topRatedApiSatus: apiStatusConstants.failure,
      }))
    }
  }

  const getApiForOriginal = async () => {
    const jwtToken = Cookies.get('jwt_token')

    setState(prev => ({
      ...prev,
      orginalApistatus: apiStatusConstants.inProgress,
    }))
    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'
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
      console.log('hello')
      const modifiedData = results.map(each => ({
        title: each.title,
        id: each.id,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
      }))

      setState(prev => ({
        ...prev,
        originaldataList: modifiedData,
        orginalApistatus: apiStatusConstants.success,
      }))
    } else {
      setState(prev => ({
        ...prev,
        orginalApistatus: apiStatusConstants.failure,
      }))
    }
  }

  const getApitrendingResult = async () => {
    const jwtToken = Cookies.get('jwt_token')

    setState(prev => ({
      ...prev,
      mainposterapiStatus: apiStatusConstants.inProgress,
    }))
    const apiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
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
        ...prev,
        mainPosterdataList: modifiedData,
        mainposterapiStatus: apiStatusConstants.success,
      }))
    } else {
      setState(prev => ({
        ...prev,
        mainposterapiStatus: apiStatusConstants.failure,
      }))
    }
  }

  const renderedTopRatingSucessView = () => {
    return (
      <ReactSlick
        topRatedData={state.topRatedDataList}
        header={'Trending Now'}
      />
    )
  }

  const renderedOriginalSucessView = () => {
    return (
      <ReactSlick topRatedData={state.originaldataList} header={'Originals'} />
    )
  }

  const loadingView = () => {
    return (
      <div className="main-container">
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
  const loadingViewforposterView = () => {
    return (
      <>
      <Header/>
      <div className="main-container">
        <div className="loader-container" testid="loader">
          <ProgressBar type="TailSpin" color="#D81F26" height={50} width={50} />
        </div>
      </div>
      </>
    )
  }

  const failurTrendingView = () => {
    return (<>
      <Header/>
      <div className="failureViewTrending">
        <FiAlertTriangle className="alertTriangle" />
        <p>Something went wrong. Please try again</p>
        <button
          onClick={() => {
            getApitrendingResult()
          }}
        >
          Try Again
        </button>
      </div>
      </>
    )
  }

  const failureTopratedview = () => {
    return (
      <div className="failureViewTopRated">
        <FiAlertTriangle className="alertTriangle" />
        <p>Something went wrong. Please try again</p>
        <button
          onClick={() => {
            getApifortopRated()
          }}
        >
          Try Again
        </button>
      </div>
    )
  }

  const failurOriginalview = () => {
    return (
      <div className="failureVieworiginal">
        <FiAlertTriangle className="alertTriangle" />
        <p>Something went wrong. Please try again</p>
        <button
          onClick={() => {
            getApiForOriginal()
          }}
        >
          Try Again
        </button>
      </div>
    )
  }

  const renderMainposterView = () => {
    const randomTrend =
      state.mainPosterdataList[
        Math.floor(Math.random() * state.mainPosterdataList.length)
      ]
    const {title} = randomTrend
    const mystyle = {
      backgroundImage: `url(${randomTrend.backdropPath})`,
      backgroundSize: 'cover',
    }
    return (
      <div className="successTrendingViewPoster-cont" style={mystyle} id="home">
        <Header />
        <div className="successTrendingViewPoster-cont-div-head">
          <div className="poser-inside-details-cont">
            <h1 className="poser-inside-details-cont-title">{title}</h1>
            <h1 className="poser-inside-details-cont-overview">
              {randomTrend.overview}
            </h1>
            <button>Play</button>
          </div>
        </div>
      </div>
    )
  }

  useEffect(() => {
    getApiForOriginal()

    getApifortopRated()
    getApitrendingResult()
  }, [])

  const renderAllapiStatusTrendingView = () => {
    const {mainposterapiStatus} = state

    switch (mainposterapiStatus) {
      case apiStatusConstants.success:
        return renderMainposterView()
      case apiStatusConstants.failure:
        return failurTrendingView()
      case apiStatusConstants.inProgress:
        return loadingViewforposterView()
      default:
        return null
    }
  }

  const renderAllOriginalView = () => {
    const {orginalApistatus} = state

    switch (orginalApistatus) {
      case apiStatusConstants.success:
        return renderedOriginalSucessView()
      case apiStatusConstants.failure:
        return failurOriginalview()
      case apiStatusConstants.inProgress:
        return loadingView()
      default:
        return null
    }
  }

  const renderAllTopRatedView = () => {
    const {topRatedApiSatus} = state

    switch (topRatedApiSatus) {
      case apiStatusConstants.success:
        return renderedTopRatingSucessView()
      case apiStatusConstants.failure:
        return failureTopratedview()
      case apiStatusConstants.inProgress:
        return loadingView()
      default:
        return null
    }
  }


  return (
    <div className="homepage">
      <div className="main-container-home">
        {renderAllapiStatusTrendingView()}
      </div>
      <div className="main-topRated">
        <div className="main-container">
          <h1>Trending Now</h1>

          {renderAllTopRatedView()}
        </div>
      </div>
      <div className="main-orginal">
        <div className="main-container">
          <h1>Originals</h1>

          {renderAllOriginalView()}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home

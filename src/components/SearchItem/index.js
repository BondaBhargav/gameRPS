import './index.css'
import {useState, useEffect} from 'react'
import {ProgressBar} from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import SearchHeader from '../searchHeader'
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const SearchItem = () => {
  const [state, setState] = useState({
    searchDataList: [],
    apiStatus: apiStatusConstants.initial,
  })

console.log("helloooooo")
  const [inputSearch, setNewInputSearch] = useState(' ')

  const getResponseFromApi = async searchInput => {
    setNewInputSearch(searchInput)
   
    if (inputSearch === ' ') {
      setState(prev => ({
        ...prev,
        apiStatus: apiStatusConstants.initial,
      }))
    } else {
      const jwtToken = Cookies.get('jwt_token')

      setState(prev => ({
        ...prev,
        apiStatus: apiStatusConstants.inProgress,
      }))
      const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
      console.log(apiUrl)
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
          searchDataList: modifiedData,
          apiStatus: apiStatusConstants.success,
        }))
      } else {
        setState(prev => ({
          ...prev,
          apiStatus: apiStatusConstants.failure,
        }))
      }
    }
  }
  
  const loadingView = () => {
    return (
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
    )
  }

  const renderFailureView = () => {
    return (
      <div className="failure-View">
        <img
          src="https://res.cloudinary.com/dtc4lwuck/image/upload/v1732363283/enulcmqxezjuuirkwo6d.png"
          alt="failureView"
        />
        <h1>something Went Wrong please try Again</h1>
        <button
          onClick={() => {
            getResponseFromApi(inputSearch)
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
        {state.searchDataList.length !== 0 ? (
          <ul className="success-View-cont">
            {state.searchDataList.map(eachItem => (
              <li key={eachItem.id} className="search-list-item">
                <Link to={`/movies/:${eachItem.id}`} className="popular-Link">
                  <img
                    src={eachItem.posterPath}
                    alt="populariamge"
                    className="popular-img-item"
                  />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="failure-View">
            <img
              className="not-found-img"
              src="https://res.cloudinary.com/dtc4lwuck/image/upload/v1732640844/m3vbndipioccve4vfid6.png"
              alt="notfound"
            />
            <h1>Your Search for {inputSearch} Did Not Find Any Matches </h1>
          </div>
        )}
      </>
    )
  }

  const renderIntialview = () => <div className="initialView"></div>

  const renderFinalStatus = () => {
    const {apiStatus} = state

    switch (apiStatus) {
      case apiStatusConstants.initial:
        return renderIntialview()
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
    <div className="serachContainer">
      <SearchHeader getResponseFromApi={getResponseFromApi} />
      <div className="search-buttom-cont">{renderFinalStatus()}</div>
    </div>
  )
}

export default SearchItem

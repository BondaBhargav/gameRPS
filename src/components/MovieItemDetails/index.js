import './index.css';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Header from '../Header';
import { ProgressBar } from 'react-loader-spinner';
import { Link, useParams } from 'react-router-dom';
import Footer from '../Footer';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const MovieItemDetails = () => {
  const { id } = useParams(); // Directly extract 'id' from params
  const [movieData, setMovieData] = useState({}); // For movie details
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  const getResponseFromApi = async () => {
    const jwtToken = Cookies.get('jwt_token');
    
    setApiStatus(apiStatusConstants.inProgress);

    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`;
    console.log(apiUrl);
    
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };

    try {
      const response = await fetch(apiUrl, options);

      if (response.ok) {
        const fetchedData = await response.json();
        const { movie_details } = fetchedData;

        const modifiedDataObj = {
          adult: movie_details.adult,
          backdropPath: movie_details.backdrop_path,
          budget: movie_details.budget,
          genres: movie_details.genres,
          id: movie_details.id,
          overview: movie_details.overview,
          posterPath: movie_details.poster_path,
          releaseDate: movie_details.release_date,
          runtime: movie_details.runtime,
          similarMovies: movie_details.similar_movies.map(each => ({
            id: each.id,
            backdropPath: each.backdrop_path,
            posterPath: each.poster_path,
            title: each.title,
          })),
          spokenLanguages: movie_details.spoken_languages.map(each => ({
            id: each.id,
            englishName: each.english_name,
          })),
          title: movie_details.title,
          voteAverage: movie_details.vote_average,
          voteCount: movie_details.vote_count,
        };

        setMovieData(modifiedDataObj);
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure);
      console.error('Error fetching movie data:', error);
    }
  };

  useEffect(() => {
    getResponseFromApi();
  }, [id]); // Depend on 'id' only

  // Loading state
  const loadingView = () => (
    <div className="loadingDiv">
      <div className="loader-container" testid="loader">
        <ProgressBar visible={true} height="80" width="80" color="#4fa94d" />
      </div>
    </div>
  );

  // Failure state
  const renderFailureView = () => (
    <div className="failure-View">
      <img
        src="https://res.cloudinary.com/dtc4lwuck/image/upload/v1732363283/enulcmqxezjuuirkwo6d.png"
        alt="failureView"
      />
      <h1>Something went wrong. Please try again</h1>
      <button onClick={getResponseFromApi}>Try again</button>
    </div>
  );

  // Success state
  const renderSuccessView = () => {
    const {
      backdropPath,
      budget,
      title,
      runtime,
      overview,
      releaseDate,
      voteAverage,
      voteCount,
      similarMovies,
      posterPath,
      spokenLanguages,
      genres,
    } = movieData;

    const mystyle = {
      backgroundImage: `url(${backdropPath})`,
    };

    return (
      <>
        <div className="top-poster-header" style={mystyle}>
          <Header />
          <div className="poster-description">
            <h1>{title}</h1>
            <div className="d-row">
              <p>{runtime}</p>
              <p>u/a</p>
              <p>{releaseDate}</p>
            </div>
            <p className="overview">{overview}</p>
            <button className="btn-play">Play</button>
          </div>
        </div>
        <div className="display-movieItem-row">
          <div>
            <div className="display-movieItem-col">
              <h1>Genres</h1>
              <ul className="display-movieItem-col">
                {genres.map(each => (
                  <li key={each.id}>{each.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <ul className="display-movieItem-col">
              <h1>Audio Available</h1>
              {spokenLanguages.map(each => (
                <li key={each.id}>{each.englishName}</li>
              ))}
            </ul>
          </div>
          <div className="display-movieItem-col">
            <h1>Rating count</h1>
            <p>{voteCount}</p>
            <h1>Rating Average</h1>
            <p>{voteAverage}</p>
          </div>
          <div className="display-movieItem-col">
            <h1>Budget</h1>
            <p>{budget}</p>
            <h1>Release Date</h1>
            <p>{releaseDate}</p>
          </div>
        </div>

        <h1 className="more-movies-heading">More like this</h1>
        <ul className="movies-more">
          {similarMovies.map(eachMovie => (
            <li key={eachMovie.id} className="similarMovies-List">
              <Link to={`/movies/${eachMovie.id}`} className="popular-Link">
                <img
                  src={eachMovie.posterPath}
                  alt="movieItem"
                  className="similarMovies-img"
                />
              </Link>
            </li>
          ))}
        </ul>

        <Footer />
      </>
    );
  };

  const renderFinalStatus = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return loadingView();
      default:
        return null;
    }
  };

  return <div className="movieItemDetails-Cont">{renderFinalStatus()}</div>;
};

export default MovieItemDetails;

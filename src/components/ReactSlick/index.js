import React, {Component} from 'react'
import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import './index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
}

const ReactSlick = props => {
  const {topRatedData, header} = props
  const renderSlider = () => {
    return (
      <Slider {...settings}>
        {topRatedData.map(eachLogo => {
          const {id, posterPath, title} = eachLogo
          return (
            <Link to={`/movies/${id}`} className="slick-item" key={id}>
              <li testid="MovieSlick">
                {' '}
                <img className="logo-image" src={posterPath} alt={title} />
              </li>
            </Link>
          )
        })}
      </Slider>
    )
  }

  return <div className="slick-container">{renderSlider()}</div>
}

export default ReactSlick

import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from '../assets/slide 1.jpg';
import slide2 from '../assets/Slide 2.png';
import slide3 from '../assets/We Sell every apple you wish.jpg';
import image1 from '../assets/Apple-iPhone-17-Pro-Max-Cosmic-Orange.jpg';
import image2 from '../assets/iPad 11.jpg';
import image3 from '../assets/OIP (2).webp';
import image4 from '../assets/OIP (1).webp';
import {Link} from 'react-router-dom';

function Home() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const productSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const products = [image1, image2, image3, image4];

  return (
    <div style={{ padding: '20px' }}>
      {/* Main Slider for slides */}
      <Slider {...sliderSettings}>
        <div>
          <img src={slide1} alt="Slide 1" style={{ width: '100%', height: 'auto', maxWidth: '100%' }} />
        </div>
        <div>
          <img src={slide2} alt="Slide 2" style={{ width: '100%', height: 'auto', maxWidth: '100%' }} />
        </div>
        <div>
          <img src={slide3} alt="We Sell every apple you wish" style={{ width: '100%', height: 'auto', maxWidth: '100%' }} />
        </div>
      </Slider>

      {/* Product Slider */}
      <div style={{ marginTop: '50px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Featured Products</h2>
        <Link to='/Products' >
        <Slider {...productSliderSettings}>
          {products.map((product, index) => (
            <div key={index} style={{ padding: '10px' }}>
              <div style={{
                backgroundColor: 'silver',
                color: 'black',
                "&:hover":{
                  backgroundColor: 'black',
                  color: 'white',
                  transition: 'background-color 0.3s ease',
                },
                borderRadius: '10px',
                padding: '20px',
                textAlign: 'center',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img src={product} alt={`Product ${index + 1}`} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
                <button style={{
                  marginTop: '15px',
                  padding: '10px 20px',
                  backgroundColor: 'black',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'black'}
                >
                  Shop Now
                </button>
              </div>  
            </div>
          ))}
        </Slider>
        </Link>
      </div>
    </div>
  );
}

export default Home;

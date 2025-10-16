// Create this file: src/components/ExampleCarouselImage.jsx
import carousel from '../assets/carousel.js';

const ExampleCarouselImage = ({ src, alt }) => (
  <img src={carousel.image} alt={alt} style={{display : 'block', width : '100%'}}/>
);

export default ExampleCarouselImage;
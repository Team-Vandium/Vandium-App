import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { Link } from 'react-router-dom';

const CarouselSlider = ({ data }) => {
  const image = (id) => require(`../Images/${id}.jpg`);
  return (
    <div className="row">
      <Carousel
        slidesPerPage={2}
        arrows
        infinite
        slidesPerScroll={2}
        autoPlay={2000}
        animationSpeed={1000}
      >
        {data.map((p) => {
          return (
            <div key={p.id}>
              <Link to={`/Products/${p.id}`}>
                <img
                  alt="test"
                  className="img-example img-fluid"
                  src={image(p.id).default}
                />
                <p className="mt-2 h6"> {p.name}</p>
              </Link>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselSlider;

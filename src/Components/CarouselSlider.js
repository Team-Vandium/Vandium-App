import Carousel, {
  slidesToShowPlugin,
  autoplayPlugin,
  arrowsPlugin,
} from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { Link } from 'react-router-dom';

const CarouselSlider = ({ data }) => {
  const image = (id) => require(`../Images/${id}.jpg`);
  return (
    <div className="row">
        <Carousel
          plugins={[
            {
              resolve: arrowsPlugin,
              options: {
                arrowLeft: <i className="fas fa-arrow-left text-primary"></i>,
                arrowLeftDisabled: <i className="fas fa-arrow-left"></i>,
                arrowRight: <i className="fas fa-arrow-right text-primary"></i>,
                arrowRightDisabled: <i className="fas fa-arrow-right"></i>,
                addArrowClickHandler: true,
              },
            },
            'infinite',
            {
              resolve: slidesToShowPlugin,
              options: {
                numberOfSlides: 6,
              },
            },
            {
              resolve: autoplayPlugin,
              options: {
                interval: 2000,
              },
            },
          ]}
          animationSpeed={1000}
          breakpoints={{
            640: {
              plugins: [
                {
                  resolve: arrowsPlugin,
                  options: {
                    arrowLeft: <i className="fas fa-arrow-left text-primary"></i>,
                    arrowLeftDisabled: <i className="fas fa-arrow-left"></i>,
                    arrowRight: <i className="fas fa-arrow-right text-primary"></i>,
                    arrowRightDisabled: <i className="fas fa-arrow-right"></i>,
                    addArrowClickHandler: true,
                  },
                },
                'infinite',
                {
                  resolve: slidesToShowPlugin,
                  options: {
                    numberOfSlides: 2,
                  },
                },
                {
                  resolve: autoplayPlugin,
                  options: {
                    interval: 2000,
                  },
                },
              ],
            },
            900: {
              plugins: [
                {
                  resolve: arrowsPlugin,
                  options: {
                    arrowLeft: <i className="fas fa-arrow-left text-primary"></i>,
                    arrowLeftDisabled: <i className="fas fa-arrow-left"></i>,
                    arrowRight: <i className="fas fa-arrow-right text-primary"></i>,
                    arrowRightDisabled: <i className="fas fa-arrow-right"></i>,
                    addArrowClickHandler: true,
                  },
                },
                'infinite',
                {
                  resolve: slidesToShowPlugin,
                  options: {
                    numberOfSlides: 3,
                  },
                },
                {
                  resolve: autoplayPlugin,
                  options: {
                    interval: 2000,
                  },
                },
              ],
            },
          }}
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

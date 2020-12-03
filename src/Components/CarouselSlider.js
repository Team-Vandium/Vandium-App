import Carousel, {
  slidesToShowPlugin,
  autoplayPlugin,
} from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

const CarouselSlider = ({ data }) => {


  const image = (id) => require(`../Images/${id}.jpg`);
  return (
    <div className="row">
      <div className="col">
        <Carousel
          plugins={[
            'arrows',
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
                'arrows',
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
                  resolve: slidesToShowPlugin,
                  options: {
                    numberOfSlides: 3,
                  }
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
              <div>
                <img
                  alt="test"
                  className="img-example img-fluid"
                  src={image(p.id).default}
                />
                <p className="mt-2 h6"> {p.name}</p>
                {/* <a className="btn btn-primary mt-2">View</a> */}
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselSlider;

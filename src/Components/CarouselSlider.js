import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { useState } from 'react';

const CarouselSlider = ({ data }) => {
  const [value, setValue] = useState(0);

  const onChange = (value) => {
    setValue(value);
  };

  const randomProducts = data
    .sort((a, b) => {
      let comparison = 0;
      comparison = Math.random() - 0.5;
      return comparison;
    })
    .slice(0, 19);
  randomProducts.map((p) => console.log(p.id));
  console.log(randomProducts);

  const image = (id) => require(`../Images/${id}.jpg`);
  return (
    <div className="row">
      <div className="col">
        <Carousel arrows slidesPerPage={1}>
          {randomProducts.map((p) => {
            return (
              <div>
                <img
                  alt="test"
                  className="img-example img-fluid"
                  src={image(p.id).default}
                />
                <p className="mt-2 h5">{p.name}</p>
                <a className="btn btn-primary mt-2">View</a>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselSlider;

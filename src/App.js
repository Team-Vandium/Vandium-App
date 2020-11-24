import ProductList from './ProductList.js';
import './App.css';
import 'bootswatch/dist/yeti/bootstrap.min.css';
import FilterBox from './Components/FilterBox.js';
import ProductCard from './Components/ProductCard.js';

function App() {
  return (
    <div className="App">
      <ProductList />
      <div className="container-md">
        {/* Started on Filter box with checkboxs, can be integrated with search box */}
        <FilterBox></FilterBox>
        <div className="row">
          <div className="col-4">
            {/* Sample Product Card - to be added to */}
            <ProductCard></ProductCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

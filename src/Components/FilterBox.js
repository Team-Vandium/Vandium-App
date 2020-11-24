import React, { Component } from 'react';

export default class FilterBox extends Component {
  constructor(props) {
    super(props);
    // create three state variables.
    // apiData is an array to hold our JSON data
    // isFetched indicates if the API call has finished
    // errorMsg is either null (none) or there is some error
    const categories = [
      'Health & Beauty',
      'Food & Drink',
      'Clothing & Fashion',
      'Jewellery',
      'Sport ',
      'Gardening & DIY',
      'Home',
      'Art',
    ];
    this.state = {
      categories,
      selectedCategory: [],
      checkboxes: categories.reduce(
        (allCategories, singleCategory) => ({
          ...allCategories,
          [singleCategory]: false,
        }),
        {}
      ),
    };
  }
  async componentDidMount() {}

  handleCheckboxChange = (e) => {
    const { value } = e.target;
    console.log(e.target.value)
    this.setState((prevState) => ({
      checkboxes: {
        ...prevState.checkboxes,
        [value]: !prevState.checkboxes[value],
      },
    }));
  };
  render() {
    return (
      <>
        <div className="card border-primary mt-3 mb-3">
          <div className="card-header text-left">Filter Products</div>
          <div className="card-body">
            <form action="">
              <fieldset className="form-group">
                <div className="row">
                  {this.state.categories.map((c) => {
                    return (
                      <div key={c} className="col-6 col-sm-4 col-lg-2">
                        <div className="form-check text-left">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={c}
                            isSelected={this.state.checkboxes[c]}
                            onChange={this.handleCheckboxChange}
                          />
                          <label className="form-check-label">{c}</label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </>
    );
  }
}

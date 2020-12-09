import React, { Component } from 'react';

export default class FilterBox extends Component {
  constructor(props) {
    super(props);
    // create three state variables.
    // apiData is an array to hold our JSON data
    // isFetched indicates if the API call has finished
    // errorMsg is either null (none) or there is some error
  }

  render() {
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
    return (
      <>
        <div className="card border-primary mt-3 mb-3">
          <div className="card-header text-left">Filter Products</div>
          <div className="card-body">
            <form action="">
              <div className="form-group">
                <div className="row">
                  {categories.map((c) => {
                    return (
                      <div key={c} className="col-6 col-sm-4 col-lg-2">
                        <div className="form-check text-left">
                          <input
                            className="form-check-input"
                            type="radio"
                            value={c}
                           // isSelected={this.props.checkboxes[c]}
                            onChange={(e) => this.props.checkboxChange(e)}
                             checked={
                               this.props.checked.indexOf(c) === -1
                                 ? false
                                 : true
                             }
                          />
                          <label className="form-check-label">{c}</label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

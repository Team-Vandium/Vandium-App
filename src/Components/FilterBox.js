import React, { Component } from 'react';
import SearchForm from './SearchForm';

export default class FilterBox extends Component {
  constructor(props) {
    super(props);
    // create three state variables.
    // apiData is an array to hold our JSON data
    // isFetched indicates if the API call has finished
    // errorMsg is either null (none) or there is some error
  }

  render() {
    return (
      <>
        <div className="card border-primary mt-3 mb-3">
          <div className="card-header bg-dark text-white text-left">Filter/Search Products</div>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <SearchForm
                  searchTerm={this.props.searchTerm}
                  onChange={this.props.onChange}
                  buttonHandler={this.props.buttonHandler}
                ></SearchForm>
              </div>
              <div className="col-12">
                {this.props.checked.length > 0 && (
                  <button
                    className="mt-1 mb-1 btn btn-primary btn-block"
                    onClick={(e) => this.props.showAll(e)}
                  >
                    Show All
                  </button>
                )}
              </div>
              {this.props.categories.map((c, index) => {
                return (
                  <div
                    key={c.id}
                    className={
                      index > 5
                        ? 'col-6 col-sm-6 col-lg-3 mb-1 mt-1'
                        : 'col-6 col-sm-4 col-lg-3 mb-1 mt-1'
                    }
                  >
                    <button
                      className={
                        this.props.checked == c.id
                          ? `btn btn-${c.colour} text-white btn-block  btn-sm`
                          : `btn btn-outline-${c.colour} text-dark btn-block  btn-sm`
                      }
                      value={c.id}
                      // isSelected={this.props.checkboxes[c]}
                      onClick={(e) => this.props.checkboxChange(e)}
                      // checked={
                      //   this.props.checked.indexOf(c.id) === -1 ? false : true
                      // }
                    >
                      <i className={`fas fa-${c.icon}`}></i> {' ' + c.name}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

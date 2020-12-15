import React, { Component } from 'react';
import SearchForm from './SearchForm';

export default class FilterBox extends Component {
  render() {
    return (
      <>
        <div className="card border-primary mt-3 mb-3">
          <div className="card-header bg-dark text-white text-left">
            Filter/Search Products
          </div>
          <div className="card-body pt-0">
            <div className="row">
              <div className="col-12">
                {/* Renders search form */}
                <SearchForm
                  searchTerm={this.props.searchTerm}
                  onChange={this.props.onChange}
                  buttonHandler={this.props.buttonHandler}
                ></SearchForm>
              </div>
              <div className="col-12">
                {/* Shows button to reset filter if a filter is selected */}
                {this.props.checked != null && (
                  <button
                    className="mt-1 mb-1 btn btn-primary btn-block"
                    onClick={(e) => this.props.showAll(e)}
                  >
                    Show All
                  </button>
                )}
              </div>
              {/* map function to display all 8 categories as buttons */}
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
                    {/* Ternary operator to change the apperance of the button when it is selected. From outlined button to filled button */}
                    <button
                      className={
                        this.props.checked === c.id
                          ? `btn btn-${c.colour} text-white btn-block  btn-sm`
                          : `btn btn-outline-${c.colour} text-dark btn-block  btn-sm`
                      }
                      value={c.id}
                      onClick={(e) => this.props.checkboxChange(e)}
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

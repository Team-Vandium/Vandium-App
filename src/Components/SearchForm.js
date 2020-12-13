import React, { Component } from 'react';

class SearchForm extends Component {
  render() {
    const searchTermFromProps = this.props.searchTerm;
    const onChangeFromProps = this.props.onChange;

    return (
      <div className="SearchFormForm">
        <hr />
        <form>
          <div className="input-group mb-2 mr-sm-2">
            <input
              type="text"
              value={searchTermFromProps}
              onChange={onChangeFromProps}
              placeholder="Search..."
              className="form-control"
            />
            <div className="input-group-prepend">
              <div
                style={{ cursor: 'pointer' }}
                onClick={this.props.buttonHandler}
                className="input-group-text bg-danger text-white"
              >
                <i className="far fa-window-close"></i>
              </div>
            </div>
          </div>
        </form>
        <hr />
      </div>
    );
  }
}
export default SearchForm;

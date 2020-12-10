import React, { Component } from 'react';
import { GoX } from 'react-icons/go';

class SearchForm extends Component {
  render() {
    const searchTermFromProps = this.props.searchTerm;
    const onChangeFromProps = this.props.onChange;

    return (
      <div className="SearchFormForm">
        <hr />
        <form>
          <div class="input-group mb-2 mr-sm-2">
            <input
              type="text"
              value={searchTermFromProps}
              onChange={onChangeFromProps}
              placeholder="Search..."
              class="form-control"
            />
            <div class="input-group-prepend">
              <div
                style={{ cursor: 'pointer' }}
                onClick={this.props.buttonHandler}
                class="input-group-text bg-danger text-white"
              >
                <i class="far fa-window-close"></i>
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

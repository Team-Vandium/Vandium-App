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
          <b>Search </b>
          <input
            type="text"
            value={searchTermFromProps}
            onChange={onChangeFromProps}
          />
          <button
            onClick={this.props.buttonHandler}
            className="btn btn-small btn-primary"
          >
            <GoX></GoX>
          </button>
        </form>
        <hr />
      </div>
    );
  }
}
export default SearchForm;

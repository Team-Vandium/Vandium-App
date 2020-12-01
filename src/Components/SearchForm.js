import React, { Component } from "react";

class SearchForm extends Component {
  render() {
    
    const searchTermFromProps = this.props.searchTerm;
    const onChangeFromProps = this.props.onChange;

    const buttonHandler = this.props.buttonHandler;

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
        </form>
        <hr/>

        <button onClick={buttonHandler}>Press to clear search</button>
      </div>
    );
  }
}
export default SearchForm;
import React, { Component } from "react";

class SearchResults extends Component {

  productFilterFunction(searchTerm) {
    return function (libraryObject) {
      let name = libraryObject.name.toLowerCase();
      let description = libraryObject.description.toLowerCase();

      return (
        searchTerm !== "" && searchTerm.length >= 3 &&
        (name.includes(searchTerm.toLowerCase()) ||
          description.includes(searchTerm.toLowerCase()))
      );
    };
  }

  render() {
    const arrayPassedAsParameter = this.props.productArray;
    const searchTermFromProps = this.props.searchTerm;

    return (
      <div className="SearchResultsDisplay">
        <hr />

        <h1>Search Results</h1>

        <table border="1">
          <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Tag</th>
          </tr>

          <tbody>
            {arrayPassedAsParameter
            .filter(this.productFilterFunction(searchTermFromProps))
              .map((a) => (
                <tr key={a.ID}>
                    <td>
                      <img src={a.image} alt="TEST" />
                    </td>
                    <td>{a.name}</td>
                    <td>{a.description}</td>
                    <td>€{a.price.toFixed(2)}</td>
                    <td>{a.tags[2]}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
} 
export default SearchResults;
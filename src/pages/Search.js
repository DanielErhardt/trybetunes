import React from 'react';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
    };
  }

  handleSearchInput = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  render() {
    const MINIMUM_LENGTH = 2;
    const { searchInput } = this.state;
    const isButtonDisabled = searchInput ? searchInput.length < MINIMUM_LENGTH : true;

    return (
      <div data-testid="page-search">
        <form>
          <input
            data-testid="search-artist-input"
            name="searchInput"
            value={ searchInput }
            onChange={ this.handleSearchInput }
          />
          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ isButtonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;

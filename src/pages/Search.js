import React from 'react';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumList from '../components/AlbumList';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      isLoading: false,
      currentSearch: '',
      albums: [],
    };
  }

  handleSearchInput = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  handleSearchButton = async (event) => {
    event.preventDefault();
    const { searchInput } = this.state;

    this.setState({
      isLoading: true,
      searchInput: '',
      currentSearch: searchInput,
    });

    const result = await searchAlbumsAPI(searchInput);

    this.setState({
      isLoading: false,
      albums: result,
    });
  }

  render() {
    const MINIMUM_LENGTH = 2;
    const { searchInput, isLoading, albums, currentSearch } = this.state;
    const isButtonDisabled = searchInput ? searchInput.length < MINIMUM_LENGTH : true;
    let resultText = albums.length > 0
      ? `Resultado de álbuns de: ${currentSearch}`
      : 'Nenhum álbum foi encontrado';

    if (!currentSearch) resultText = '';
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
            onClick={ this.handleSearchButton }
          >
            Pesquisar
          </button>
        </form>
        <section>
          {isLoading ? <Loading /> : <p>{ resultText }</p>}
          {albums.length > 0 && (
            <AlbumList albums={ albums } />
          )}
        </section>
      </div>
    );
  }
}

export default Search;

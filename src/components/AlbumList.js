import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AlbumCard from './AlbumCard';

class AlbumList extends React.Component {
  render() {
    const { albums } = this.props;
    console.log(typeof albums);
    return (
      <section>
        {albums && albums.map((album) => (
          <Link
            to={ `album/${album.collectionId}` }
            key={ album.collectionId }
            data-testid={ `link-to-album-${album.collectionId}` }
          >
            <AlbumCard { ...album } />
          </Link>
        ))}
      </section>
    );
  }
}

AlbumList.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
  })).isRequired,
};

export default AlbumList;

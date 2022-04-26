import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Album from './Album';

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
            <Album { ...album } />
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

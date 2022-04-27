import React from 'react';
import PropTypes from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const { artistName, collectionName } = this.props;
    return (
      <div>
        <p>
          Artista:
          { artistName }
        </p>
        <p>
          Album:
          { collectionName }
        </p>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
};

export default AlbumCard;

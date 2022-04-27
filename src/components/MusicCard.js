import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
    };
  }

  handleFavoriteCheckbox = async ({ target }) => {
    const { checked } = target;
    const { song, updateFavorites } = this.props;
    this.setState({ isLoading: true });

    if (checked) {
      await addSong(song);
    } else {
      await removeSong(song);
    }
    await updateFavorites();
    this.setState({ isLoading: false });
  }

  render() {
    const { song, isFavorite } = this.props;
    const { previewUrl, trackName, trackId } = song;
    const { isLoading } = this.state;
    return (
      <div>
        {isLoading && <Loading />}
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            id={ trackId }
            type="checkbox"
            checked={ isFavorite }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleFavoriteCheckbox }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  updateFavorites: PropTypes.func.isRequired,
};

export default MusicCard;

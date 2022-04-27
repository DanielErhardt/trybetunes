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
    this.setState({ isLoading: true });

    if (checked) {
      await addSong(this.props);
    } else {
      await removeSong(this.props);
    }

    this.setState({ isLoading: false });
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props;
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
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleFavoriteCheckbox }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;

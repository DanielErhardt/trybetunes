import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      artist: '',
      album: '',
      musicList: [],
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.fetchMusics();
    this.fetchFavorites();
  }

  fetchFavorites = async () => {
    this.setState({ isLoading: true });
    const fetchedFavorites = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favoriteSongs: fetchedFavorites,
    });
    console.log('fetch');
  }

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    let musics = await getMusics(id);
    musics = musics.filter((m, i) => i !== 0);
    const { artistName, collectionName } = musics[0];
    this.setState({
      isLoading: false,
      musicList: musics,
      artist: artistName,
      album: collectionName,
    });
  }

  isSongFavorite = (song) => {
    const { favoriteSongs } = this.state;
    return favoriteSongs.some((s) => s.trackId === song.trackId);
  }

  clearFavorites = async () => {
    const favorites = await getFavoriteSongs();
    favorites.forEach((s) => removeSong(s));
  }

  render() {
    const {
      artist,
      album,
      isLoading,
      musicList,
    } = this.state;

    return (
      <div data-testid="page-album">
        <p data-testid="artist-name">{`Artist Name: ${artist}`}</p>
        <p data-testid="album-name">{`Collection Name: ${album}`}</p>
        {isLoading ? (
          <Loading />
        ) : (
          musicList.map((music) => (
            <MusicCard
              key={ music.trackId }
              song={ music }
              updateFavorites={ this.fetchFavorites }
              isFavorite={ this.isSongFavorite(music) }
            />
          ))
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape.isRequired,
};

export default Album;

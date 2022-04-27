import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      artist: '',
      album: '',
      musicList: [],
    };
  }

  componentDidMount() {
    this.fetchMusics();
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

  render() {
    const {
      artist,
      album,
      isLoading,
      musicList,
    } = this.state;

    console.log(musicList);
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
              { ...music }
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

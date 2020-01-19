import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from "../../util/Spotify";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            playlistName: "Playlist Name",
            playlistTracks: []
        };

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);

    }

    addTrack(track) {
        let tracks = this.state.playlistTracks;
        if (tracks.find(savedTrack => savedTrack.id === track.id)) {
            return;
        }

        // Otherwise add the track and update the playlist
        tracks.push(track);
        this.setState({
            playlistTracks: tracks
        });
    }

    removeTrack(track) {
        let tracks = this.state.playlistTracks;

        /// If it is true that they are not equal then it will go into our tracks array
        tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

        this.setState({
            playlistTracks: tracks
        });
    }

    updatePlaylistName(name) {
        this.setState({
            playlistName: name
        });
    }

    /**
     * Generates an array of uri values called trackURIs from the playlist tracks property
     **/
    savePlaylist() {
        const trackURIs = this.state.playlistTracks.map(track => track.uri);
        Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
            this.setState( {
                playlistName: 'New Playlist',
                playlistTracks: []
            })
        })
    }

    search(term) {
        Spotify.search(term).then(searchResults => {
            this.setState({
                searchResults: searchResults
            });
        });
    }




  render() {
    return (
        <div><h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            {/* Add a SearchBar component */}
              <SearchBar onSearch={this.search}></SearchBar>
            <div className="App-playlist">
              {/* Add a SearchResults component */}
                <SearchResults searchResults={this.state.searchResults}
                               onAdd={this.addTrack}></SearchResults>
              {/* Add a Playlist component */}
              <Playlist playlistName={this.state.playlistName}
                        playlistTracks={this.state.playlistTracks}
                        onRemove={this.removeTrack}
                        onNameChange={this.updatePlaylistName}
                        onSave={this.savePlaylist}
              ></Playlist>
            </div>
          </div>
        </div>
    )
  }
}

export default App;

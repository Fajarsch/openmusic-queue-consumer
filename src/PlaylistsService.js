const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getDetailPlaylist(playlistId) {
    const query = {
      text: `SELECT playlists.*, songs.id, songs.title, songs.performer FROM playlists
      INNER JOIN playlistsongs ON playlistsongs.playlist_id = playlists.id
      INNER JOIN songs ON songs.id = playlistsongs.song_id`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);

    const songs = result.rows.map(({ song_id, title, performer }) => ({
      id: song_id,
      title,
      performer,
    }));

    return {
      playlist: {
        id: result.rows[0].id,
        name: result.rows[0].name,
        songs,
      },
    };
  }
}

module.exports = PlaylistsService;

class PlaylistController{
    constructor(playlistView, requester, baseUrl, appKey){
        this._playlistView = playlistView;
        this.requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/appdata/" + appKey + "/";
    }
    showCreatePlayListPage() {
        this._playlistView.showCreatePlayListPage()
    }

    showPlaylistsPage() {
        let _that = this;

        this.requester.get(this._baseServiceUrl + "playLists",
            function success(data) {
                _that._playlistView.showPlaylistsPage(data);
            },
            function error() {
                showPopup('error', "Error loading playlists!");
            }
        );
    }
    createPlayList(data) {

        this.requester.post(this._baseServiceUrl + "playLists", data,
            function success() {
                showPopup('success', "You have successfully create a playlist.");
                redirectUrl("#/");
            },
            function error() {
                showPopup('error', "An error has occurred while attempting to create a playlist.");
            });
    }

    showEditPlayListPage(id) {
        let requestUrl = this._baseServiceUrl + "playLists";

        let _that = this;

        this.requester.get(requestUrl + "/" + id,  function success(data) {
                // console.log("pl", data);
                _that._playlistView.showEditPlayListPage(id, data);
            },
            function error() {
                showPopup('error', "Error loading Playlist!");
            }
        );
    }

    editPlayList(data) {
        let requestUrl = this._baseServiceUrl + "playLists";

        this.requester.put(requestUrl + "/" + data["id"], data,
            function success() {
                showPopup('success', "You have successfully modified the playlist.");
                redirectUrl("#/");
            },
            function error() {
                showPopup('error', "An error has occurred while attempting to modify the playlist.");
            });
    }

    showViewPlaylist(id) {
        let requestUrl = this._baseServiceUrl + "playLists";

        let _that = this;

        this.requester.get(requestUrl + "/" + id + "?resolve=songs",  function success(data) {
                // console.log("pl", data);
                data.id = id;
                _that._playlistView.showViewPlayListPage(data);
            },
            function error() {
                showPopup('error', "Error loading Playlist!");
            }
        );
    }

    showDeletePlaylistPage(id){
        let requestUrl = this._baseServiceUrl + "playLists";

        let _that = this;

        this.requester.get(requestUrl + "/" + id,  function success(data) {
                _that._playlistView.showDeletePlaylistPage(id, data);
            },
            function error() {
                showPopup('error', "Error loading playList!");
            }
        );
    }

    deletePlaylist(data){
        let requestUrl = this._baseServiceUrl + "playLists";

        this.requester.delete(requestUrl + "/" + data["id"], data,
            function success() {
                showPopup('success', "You have successfully deleted playlist.");
                redirectUrl("#/");
            },
            function error(data) {
                showPopup('error', "An error has occurred while attempting to deleted playlist.");
            });
    }

    showAddSongPage(id) {
        let _that = this;

        let catalogSongs = [];

        _that._playlistView.showAddSongPage();

        this.requester.get(this._baseServiceUrl + "playLists/" + id,  function success(data) {
                console.log(data);

                _that._playlistView.showPlaylistInfo(data);
            },
            function error() {
                showPopup('error', "Error loading Playlist!");
            }
        );

        this.requester.get(this._baseServiceUrl + "songs",
            function success(data) {
                data.sort(function (elem1, elem2) {
                    let date1 = new Date(elem1._kmd.ect);
                    let date2 = new Date(elem2._kmd.ect);
                    return date2 - date1;
                });

                for (let i = 0; i < data.length && i < 10; i++) {
                    data[i].songId = data._id;
                    catalogSongs.push(data[i]);
                }

                _that._playlistView.showAddSongsTable(id, catalogSongs);

            },
            function error() {
                showPopup('error', "Error loading playlists!");
            });
    }

    addSongToPlaylist(data) {
        let requestUrl = this._baseServiceUrl + "playLists";
        let _that = this;

        let playlistId = data["id"];

        this.requester.get(requestUrl + "/" + playlistId + "?resolve=songs",  function success(playlist) {


                // Tuk za relacii - http://devcenter.kinvey.com/rest/guides/datastore#RelationalData

                let songs = new Array();
                if(typeof(playlist.songs) !== "undefined") {
                    songs = playlist.songs;
                }

                songs.push({
                    "_type": "KinveyRef",
                    "_id": data["song_id"],
                    "_collection": "songs"
                });

                playlist.songs = songs;

                _that.requester.put(requestUrl + "/" + playlistId, playlist,
                    function success() {
                        showPopup('success', "You have successfully added a song to the playlist.");
                        // redirectUrl("#/");
                    },
                    function error() {
                        showPopup('error', "An error has occurred while adding a song to the playlist.");
                    }
                );
            },
            function error() {
                showPopup('error', "Error loading playList!");
            }
        );

    }


    deleteSongFromPlaylist(data) {
        let requestUrl = this._baseServiceUrl + "playLists";
        let _that = this;

        let playlistId = data["id"];
        let songId = data["song_id"];

        this.requester.get(requestUrl + "/" + playlistId + "?resolve=songs",  function success(playlist) {



                let songs = new Array();

                for (let i = playlist.songs.length - 1; i >= 0; i--) {
                    // Mahane na pesenta
                    if(songId !== playlist.songs[i]._id) {
                        songs.push( playlist.songs[i]);
                    }
                }

                playlist.songs = songs;


                _that.requester.put(requestUrl + "/" + playlistId, playlist,
                    function success() {
                        showPopup('success', "You have successfully deleted a song to the playlist.");
                        redirectUrl("#/viewPlaylist/" + playlistId);
                    },
                    function error() {
                        showPopup('error', "An error has occurred while deleted a song to the playlist.");
                    }
                );
            },
            function error() {
                showPopup('error', "Error loading playList!");
            }
        );

    }
}

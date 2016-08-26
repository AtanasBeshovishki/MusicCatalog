class SongController {
    constructor(songView, requester, baseUrl, appKey) {
        this._songView = songView;
        this.requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/appdata/" + appKey + "/";
    }

    showCreateSongPage() {
        this._songView.showCreateSongPage();
    }

    createSong(data) {
        let requestUrl = this._baseServiceUrl + "songs";

        this.requester.post(requestUrl, data,
            function success(data) {
                showPopup('success', "You have successfully created a new song.");
                redirectUrl("#/");
            },
            function error(data) {
                showPopup('error', "An error has occurred while attempting to create a new song.");
            });
    }

    showCreatePlayListPage() {
        this._songView.showCreatePlayListPage()
    }

    createPlayList(data) {

        let requestUrl = this._baseServiceUrl + "playLists";
        this.requester.post(requestUrl, data,
            function success(data) {
                showPopup('success', "You have successfully create a play list.");
                redirectUrl("#/");
            },
            function error(data) {
                showPopup('error', "An error has occurred while attempting to create a play list.");
            });
    }

    showEditSongPage(id){
        let requestUrl = this._baseServiceUrl + "songs";

        let _that = this;

        this.requester.get(requestUrl + "/" + id,  function success(data) {
                _that._songView.showEditSongPage(id, data);
            },
            function error(data) {
                showPopup('error', "Error loading Songs!");
            }
        );
    }

    editSong(data){
        let requestUrl = this._baseServiceUrl + "songs";

        this.requester.put(requestUrl + "/" + data["id"], data,
            function success(data) {
                showPopup('success', "You have successfully modified the song.");
                redirectUrl("#/");
            },
            function error(data) {
                showPopup('error', "An error has occurred while attempting to modify the song.");
            });
    }

    showEditPlayListPage(id) {
    	let requestUrl = this._baseServiceUrl + "playLists";

    	let _that = this;

    	this.requester.get(requestUrl + "/" + id,  function success(data) {
        		_that._songView.showEditPlayListPage(id, data);
            },
            function error(data) {
               showPopup('error', "Error loading Playlist!");
            }
        );
    }

    editPlayList(data) {
        let requestUrl = this._baseServiceUrl + "playLists";

        this.requester.put(requestUrl + "/" + data["id"], data,
            function success(data) {
                showPopup('success', "You have successfully modified the play list.");
                redirectUrl("#/");
            },
            function error(data) {
                showPopup('error', "An error has occurred while attempting to modify the play list.");
            });
    }

    showDeleteSongPage(id){
        let requestUrl = this._baseServiceUrl + "songs";

        let _that = this;

        this.requester.get(requestUrl + "/" + id,  function success(data) {
                _that._songView.showDeleteSongPage(id, data);
            },
            function error(data) {
                showPopup('error', "Error loading song!");
            }
        );
    }

    deleteSong(data){
        let requestUrl = this._baseServiceUrl + "songs";

        this.requester.delete(requestUrl + "/" + data["id"], data,
            function success(data) {
                showPopup('success', "You have successfully deleted song.");
                redirectUrl("#/");
            },
            function error(data) {
                showPopup('error', "An error has occurred while attempting to deleted song.");
            });
    }

    showDeletePlaylistPage(id){
        let requestUrl = this._baseServiceUrl + "playLists";

        let _that = this;

        this.requester.get(requestUrl + "/" + id,  function success(data) {
                _that._songView.showDeletePlaylistPage(id, data);
            },
            function error(data) {
                showPopup('error', "Error loading playList!");
            }
        );
    }

    deletePlaylist(data){
        let requestUrl = this._baseServiceUrl + "playLists";

        this.requester.delete(requestUrl + "/" + data["id"], data,
            function success(data) {
                showPopup('success', "You have successfully deleted playlist.");
                redirectUrl("#/");
            },
            function error(data) {
                showPopup('error', "An error has occurred while attempting to deleted playlist.");
            });
    }

    showAddSongPage(){
        let _that = this;

        let catalogSongs = [];

        let requestUrl = this._baseServiceUrl;

        this._requester.get(requestUrl + "songs",
            function success(data) {

                data.sort(function (elem1, elem2) {
                    let date1 = new Date(elem1._kmd.ect);
                    let date2 = new Date(elem2._kmd.ect);
                    return date2 - date1;
                });

                let currentId = 1;

                for (let i = 0; i < data.length && i < 5; i++) {
                    data[i].songId = currentId;
                    currentId++;
                    catalogSongs.push(data[i]);
                }

                //TODO : Create view function
                _that._songView.showAddSongPage(catalogSongs);

            },
            function error(data) {
                showPopup('error', "Error loading play lists!");
            });
    }

    addSong(data) {
        let requestUrl = this._baseServiceUrl + "songs";

        this.requester.put(requestUrl, data,
            function success(data) {
                showPopup('success', "You have successfully added song.");
                redirectUrl("#/");
            },
            function error(data) {
                showPopup('error', "An error has occurred while attempting to add song.");
            });
    }
}
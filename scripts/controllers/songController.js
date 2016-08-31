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
        if (data.title.length == "") {
            showPopup('error', "Title cannot be empty.");
            return;
        }
        if (data.description.length == "") {
            showPopup('error', "Description cannot be empty.");
            return;
        }
        if (data.file.length == "") {
            showPopup('error', "File cannot be empty.");
            return;
        }

        this.requester.post(requestUrl, data,
            function success() {
                showPopup('success', "You have successfully created a new song.");
                redirectUrl("#/");
            },
            function error() {
                showPopup('error', "An error has occurred while attempting to create a new song.");
            });
    }

    showSongsPage() {
        let _that = this;

        this.requester.get(this._baseServiceUrl + "songs",
            function success(data) {
            console.log(data);
                _that._songView.showSongsPage(data);
            },
            function error() {
                showPopup('error', "Error loading songs!");
            }
        );
    }

    showEditSongPage(id) {
        let requestUrl = this._baseServiceUrl + "songs";

        let _that = this;

        this.requester.get(requestUrl + "/" + id, function success(data) {

                _that._songView.showEditSongPage(id, data);
            },
            function error() {
                showPopup('error', "Error loading Songs!");
            }
        );
    }

    editSong(data) {
        let requestUrl = this._baseServiceUrl + "songs";

        this.requester.put(requestUrl + "/" + data["id"], data,
            function success() {
                showPopup('success', "You have successfully modified the song.");
                redirectUrl("#/songs")
            },
            function error() {
                showPopup('error', "An error has occurred while attempting to modify the song.");
            });
    }

    showDeleteSongPage(id) {
        let requestUrl = this._baseServiceUrl + "songs";

        let _that = this;

        this.requester.get(requestUrl + "/" + id, function success(data) {
                _that._songView.showDeleteSongPage(id, data);
            },
            function error() {
                showPopup('error', "Error loading song!");
            }
        );
    }

    deleteSong(data) {
        let requestUrl = this._baseServiceUrl + "songs";

        this.requester.delete(requestUrl + "/" + data["id"], data,
            function success() {
                showPopup('success', "You have successfully deleted song.");
                redirectUrl("#/");
            },
            function error() {
                showPopup('error', "An error has occurred while attempting to deleted song.");
            });
    }

}
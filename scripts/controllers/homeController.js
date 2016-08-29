class HomeController {
    constructor(homeView, requester, baseServiceUrl, appKey) {
        this._homeView = homeView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseServiceUrl;
    }

    showGuestPage(data) {
        let _that = this;

        let catalogSongs = [];

        _that._homeView.showGuestPage(null, null);
    }

    showUserPage() {
        let _that = this;

        let catalogSongs = [];

        let catalogPlayLists = [];

        _that._homeView.showUserPage();

        let requestUrl = this._baseServiceUrl + "/appdata/" + this._appKey + "/";

        this._requester.get(requestUrl + "playLists",
            function success(data) {

                data.sort(function (elem1, elem2) {
                    let date1 = new Date(elem1._kmd.ect);
                    let date2 = new Date(elem2._kmd.ect);
                    return date2 - date1;
                });

                for (let i = 0; i < data.length && i < 3; i++) {
                    catalogPlayLists.push(data[i]);
                }

                //TODO : Create view function
                _that._homeView.showPlayListsTable("Last 3 Playlists", catalogPlayLists);

            },
            function error(data) {
                showPopup('error', "Error loading playlists!");
            });

        this._requester.get(requestUrl + "songs",
            function success(data) {

                data.sort(function (elem1, elem2) {
                    let date1 = new Date(elem1._kmd.ect);
                    let date2 = new Date(elem2._kmd.ect);
                    return date2 - date1;
                });

                for (let i = 0; i < data.length && i < 3; i++) {
                    catalogSongs.push(data[i]);
                }

                _that._homeView.showSongsTable("Last 3 Songs", catalogSongs);

            },

            function error(data) {
                showPopup('error', "Error loading songs!");
            });
    }

}
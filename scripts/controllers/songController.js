class SongController {
    constructor(songView, requester, baseUrl, appKey) {
        this._songView = songView;
        this.requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/appdata/" + appKey + "/songs";
    }

    showCreateSongPage() {
        console.log('SSSSs');
        this._songView.showCreateSongPage();
    }

    createSong(data) {
        // if(requestData.title.length < 10) {
        //     showPopup('error', "Post title must consist of at least 10 symbols.");
        //     return;
        // }
        //
        // if(requestData.content.length < 50){
        //     showPopup('error', "Post content must consist of at least 50 symbols.");
        //     return;
        // }
        //
        let requestUrl = this._baseServiceUrl;

        this.requester.post(requestUrl, data,
            function success(data) {
                showPopup('success', "You have successfully created a new song.");
                redirectUrl("#/");
            },
            function error(data) {
                showPopup('error', "An error has occurred while attempting to create a new song.");
            });
    }
}
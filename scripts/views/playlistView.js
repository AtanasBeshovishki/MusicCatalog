class PlaylistView {
    constructor(wrapperSelector, navBarSelector) {
        this._wrapperSelector = wrapperSelector;
        this._navBarSelector = navBarSelector;

        let _that = this;

        $.get("templates/navbarUser.html", function (template) {

            let data = {username: sessionStorage.username};
            let rendered = Mustache.render(template, data);
            $(_that._navBarSelector).html(rendered);
        });
    }
    showCreatePlayListPage() {
        let _that = this;
        let templateUrl;
        templateUrl = "templates/create-playList.html";

        $.get(templateUrl, function (template) {
            let rendered = Mustache.render(template, null);
            $(_that._wrapperSelector).html(rendered);


            $('#create-playList-button').on('click', function () {

                let title = $('#title').val();
                let date = moment().format("MMMM Do YYYY");


                let data = {
                    title: title,
                    date: date
                };

                triggerEvent('createPlayList', data);

            });
            $('#cancel-button').on('click', function () {
                redirectUrl('#/')
            });

        });
    }
    showPlaylistsPage(data) {
        let _that = this;

        $.get("templates/playlists.html", function (template) {
            let rendered = Mustache.render(template, {playLists: data});
            $(_that._wrapperSelector).html(rendered);
        });
    }
    showEditPlayListPage(id, data) {
        let _that = this;

        $.get("templates/editPlayList.html", function (template) {
            let rendered = Mustache.render(template, data);

            $(_that._wrapperSelector).html(rendered);

            $('#edit-playlist-button').on('click', function () {

                let title = $('#title').val();
                let date = moment().format("MMMM Do YYYY");

                let item = {
                    id: id,
                    title: title,
                    date: date
                };

                triggerEvent('editPlayList', item);
            });

            $('#cancel-button').on('click', function () {
                redirectUrl('#/')
            });
        });
    }
    showViewPlayListPage(data) {
        let _that = this;

        $.get("templates/viewPlayList.html", function (template) {
            let rendered = Mustache.render(template, data);

            $(_that._wrapperSelector).html(rendered);
        });
    }
    showDeletePlaylistPage(id, data) {
        let _that = this;

        $.get("templates/deletePlaylist.html", function (template) {
            let rendered = Mustache.render(template, data);

            $(_that._wrapperSelector).html(rendered);

            $('#delete-playlist-button').on('click', function () {

                let item = {
                    id: id
                };

                triggerEvent('deletePlaylist', item);
            });

            $('#cancel-button').on('click', function () {
                redirectUrl('#/')
            });
        });
    }
    showPlaylistInfo(playlist) {

        $.get('templates/showPlaylistInfo.html', function (template) {
            console.log("playlist", playlist);

            let rendered = Mustache.render(template, {playlist: playlist});
            $('#playlist').html(rendered);
        });
    }
}

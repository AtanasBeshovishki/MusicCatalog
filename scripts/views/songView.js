class SongView {
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

    showCreateSongPage() {

        let _that = this;
        let templateUrl;

        templateUrl = "templates/create-song.html";

        $.get(templateUrl, function (template) {
            let rendered = Mustache.render(template, null);
            $(_that._wrapperSelector).html(rendered);


            $('#create-song-button').on('click', function (ev) {

                let title = $('#title').val();
                let description = $('#description').val();
                let file = $('#file').val();
                let date = moment().format("MMMM Do YYYY");

                let data = {
                    title: title,
                    description: description,
                    file: file,
                    date: date
                };

                triggerEvent('createSong', data);

            });
            $('#cancel-button').on('click', function (ev) {
                redirectUrl('#/')
            });
        });
    }

    showSongsPage(data) {
        let _that = this;

        $.get("templates/songs.html", function (template) {
            let rendered = Mustache.render(template, {songs: data});
            $(_that._wrapperSelector).html(rendered);
        });
    }

    showEditSongPage(id, data) {
        let _that = this;

        $.get("templates/editSong.html", function (template) {
            let rendered = Mustache.render(template, data);
            $(_that._wrapperSelector).html(rendered);

            $('#edit-song-button').on('click', function (ev) {

                let title = $('#title').val();
                let description = $('#description').val();
                let file = $('#file').val();
                let date = moment().format("MMMM Do YYYY");

                let item = {
                    id: id,
                    title: title,
                    description: description,
                    file: file,
                    date: date
                };

                triggerEvent('editSong', item);
            });

            $('#cancel-button-editSong').on('click', function (ev) {
                redirectUrl('#/songs')
            });
        });
    }

    showDeleteSongPage(id, data) {
        let _that = this;

        $.get("templates/deleteSong.html", function (template) {
            let rendered = Mustache.render(template, data);
            $(_that._wrapperSelector).html(rendered);

            $('#delete-song-button').on('click', function (ev) {

                let item = {
                    id: id
                };

                triggerEvent('deleteSong', item);
            });

            $('#cancel-button-deleteSong').on('click', function (ev) {
                redirectUrl('#/songs')
            });
        });
    }

    showAddSongsTable(id, catalogSongs) {

        $.get('templates/addSongsList.html', function (template) {
            let templateVars = {
                playlistId: id,
                songs: catalogSongs
            };

            let rendered = Mustache.render(template, templateVars);
            $('#songs').html(rendered);
        });
    }
}
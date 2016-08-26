class SongView {
    constructor(wrapperSelector, navBarSelector) {
        this._wrapperSelector = wrapperSelector;
        this._navBarSelector = navBarSelector;
    }

    showCreateSongPage() {

        let _that = this;
        let templateUrl;


        templateUrl = "templates/create-song.html";


        $.get("templates/navbarUser.html", function (template) {
            let rendered = Mustache.render(template, null);
            $(_that._navBarSelector).html(rendered);
        });

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

    showCreatePlayListPage() {
        let _that = this;
        let templateUrl;
        templateUrl = "templates/create-playList.html";

        $.get("templates/navbarUser.html", function (template) {
            let rendered = Mustache.render(template, null);
            $(_that._navBarSelector).html(rendered);
        });

        $.get(templateUrl, function (template) {
            let rendered = Mustache.render(template, null);
            $(_that._wrapperSelector).html(rendered);


            $('#create-playList-button').on('click', function (ev) {

                let title = $('#title').val();
                let date = moment().format("MMMM Do YYYY");


                let data = {
                    title: title,
                    date: date
                };

                triggerEvent('createPlayList', data);

            });
            $('#cancel-button').on('click', function (ev) {
                redirectUrl('#/')
            });

        });
    }

    showEditSongPage(id, data) {
        let _that = this;

        $.get("templates/navbarUser.html", function (template) {
            let rendered = Mustache.render(template, null);
            $(_that._navBarSelector).html(rendered);
        });

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

            $('#cancel-button').on('click', function (ev) {
                redirectUrl('#/')
            });
        });
    }

    showEditPlayListPage(id, data) {
        let _that = this;

        $.get("templates/navbarUser.html", function (template) {
            let rendered = Mustache.render(template, null);
            $(_that._navBarSelector).html(rendered);
        });

        $.get("templates/editPlayList.html", function (template) {
            let rendered = Mustache.render(template, data);

            $(_that._wrapperSelector).html(rendered);

            $('#edit-playlist-button').on('click', function (ev) {

                let title = $('#title').val();
                let date = moment().format("MMMM Do YYYY");

                let item = {
                    id: id,
                    title: title,
                    date: date
                };

                triggerEvent('editPlayList', item);
            });

            $('#cancel-button').on('click', function (ev) {
                redirectUrl('#/')
            });
        });
    }

    showDeleteSongPage(id, data) {
        let _that = this;

        $.get("templates/navbarUser.html", function (template) {
            let rendered = Mustache.render(template, null);
            $(_that._navBarSelector).html(rendered);
        });

        $.get("templates/deleteSong.html", function (template) {
            let rendered = Mustache.render(template, data);

            $(_that._wrapperSelector).html(rendered);

            $('#delete-song-button').on('click', function (ev) {

                let item = {
                    id: id
                };

                triggerEvent('deleteSong', item);
            });

            $('#cancel-button').on('click', function (ev) {
                redirectUrl('#/')
            });
        });
    }

    showDeletePlaylistPage(id, data) {
        let _that = this;

        $.get("templates/navbarUser.html", function (template) {
            let rendered = Mustache.render(template, null);
            $(_that._navBarSelector).html(rendered);
        });

        $.get("templates/deletePlaylist.html", function (template) {
            let rendered = Mustache.render(template, data);

            $(_that._wrapperSelector).html(rendered);

            $('#delete-playlist-button').on('click', function (ev) {

                let item = {
                    id: id
                };

                triggerEvent('deletePlaylist', item);
            });

            $('#cancel-button').on('click', function (ev) {
                redirectUrl('#/')
            });
        });
    }

    showAddSongPage(catalogSongs) {

            $.get('templates/addSong.html', function (template) {
                let templateVars = {
                    songs: catalogSongs
                };
                let renderedSongs = Mustache.render(template, templateVars);
                $('#songs').html(renderedSongs);
            });
    }

}
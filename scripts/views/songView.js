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

        });
    }

    showEditSongPage() {
        let _that = this;
        let templateUrl;
        // templateUrl = "templates/editSong.html";

        $.get("templates/navbarUser.html", function (template) {
            let rendered = Mustache.render(template, null);
            $(_that._navBarSelector).html(rendered);
        });

        $.get("templates/editSong.html", function (template) {
            let rendered = Mustache.render(template, null);
            $(_that._wrapperSelector).html(rendered);



            $('#edit-song-button').on('click', function (ev) {

                let title = $('#title').val();
                let date = moment().format("MMMM Do YYYY");


                let data = {
                    title: title,
                    description:description,
                    file:file
                };
                $.getById(title);

                triggerEvent('editSong', data);

            });

            $('#cancel-song-button').on('click', function (ev) {
                redirectUrl('#/')
            })


        });
    }

    showEditPlayListPage() {
        let _that = this;
        let templateUrl;
        // templateUrl = "templates/editSong.html";

        $.get("templates/navbarUser.html", function (template) {
            let rendered = Mustache.render(template, null);
            $(_that._navBarSelector).html(rendered);
        });

        $.get("templates/editPlayList.html", function (template) {
            let rendered = Mustache.render(template, null);
            $(_that._wrapperSelector).html(rendered);


            $('#editPlayList').on('click', function (ev) {

                let title = $('#title').val();
                let date = moment().format("MMMM Do YYYY");

                //
                // let data = {
                //     title: title,
                //     date: date
                // };

                // triggerEvent('editSong', data);

            });

            $('#cancel-song-button').on('click', function (ev) {
                redirectUrl('#/')
            })

        });
    }
}
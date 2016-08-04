class SongView {
    constructor(wrapperSelector, mainContentSelector) {
        this._wrapperSelector = wrapperSelector;
        this._mainContentSelector = mainContentSelector;
    }

    showCreateSongPage() {
        console.log('zzz');
        let _that = this;
        let templateUrl;

        // if(isLoggedIn){
        templateUrl = "templates/create-song.html";
        // }
        // else{
        //     templateUrl = "templates/welcome-guest.html";
        // }

        $.get(templateUrl, function (template) {
            let rendered = Mustache.render(template, null);
            $(_that._wrapperSelector).html(rendered);

            // $('#author').val(data.fullName);

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
        // });

    }
}
class HomeView {
    constructor(wrapperSelector, navBarSelector) {
        this._wrapperSelector = wrapperSelector;
        this._navBarSelector = navBarSelector;
    }

    showGuestPage(data) {
        let _that = this;

        $.get('templates/welcome-guest.html', function (template) {
            let renderedWrapper = Mustache.render(template, null);
            $(_that._wrapperSelector).html(renderedWrapper);

            // $.get('templates/songs.html', function (template) {
            //     console.log("wwww");
            //     let catalogSongs = {
            //         catalogSongs: data
            //     };
            //     console.log("qqqq");
            //     let renderedSongs = Mustache.render(template, catalogSongs);
            //     $('.articles').html(renderedSongs);
            //     console.log("wwww");
            // });
        });

        $.get('templates/navbarGuest.html', function (template) {
            let renderedContent = Mustache.render(template, null);
            $(_that._navBarSelector).html(renderedContent);

        });


    }

    showUserPage(data) {
        let _that = this;

        $.get('templates/welcome-user.html', function (template) {
            let rendered = Mustache.render(template, null);
            $(_that._wrapperSelector).html(rendered);

        });


        $.get('templates/navbarUser.html', function (template) {
            let renderedContent = Mustache.render(template, null);
            $(_that._navBarSelector).html(renderedContent);

        });
    }

    showPlayListsTable(catalogPlayLists) {

        $.get('templates/playLists.html', function (template) {
            let templateVarsP = {
                playLists: catalogPlayLists //data
            };
            let renderedPlayLists = Mustache.render(template, templateVarsP);
            $('#playLists').html(renderedPlayLists);
        });
    }

    showSongsTable(catalogSongs) {

        $.get('templates/songs.html', function (template) {
            let templateVars = {
                songs: catalogSongs
            };
            let renderedSongs = Mustache.render(template, templateVars);
            $('#songs').html(renderedSongs);
        });
    }

}
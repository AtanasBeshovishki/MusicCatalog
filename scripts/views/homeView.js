class HomeView {
    constructor(wrapperSelector, navBarSelector) {
        this._wrapperSelector = wrapperSelector;
        this._navBarSelector = navBarSelector;
    }

    showGuestPage() {
        let _that = this;

        $.get('templates/welcome-guest.html', function (template) {
            let renderedWrapper = Mustache.render(template, null);
            $(_that._wrapperSelector).html(renderedWrapper);
        });

        $.get('templates/navbarGuest.html', function (template) {
            let renderedContent = Mustache.render(template, null);
            $(_that._navBarSelector).html(renderedContent);

        });
    }

    showUserPage() {
        let _that = this;

        $.get('templates/welcome-user.html', function (template) {
            let rendered = Mustache.render(template, null);
            $(_that._wrapperSelector).html(rendered);

        });
        $.get("templates/navbarUser.html", function (template) {

            let data = {username:sessionStorage.username};
            let rendered = Mustache.render(template, data);
            $(_that._navBarSelector).html(rendered);
        });
    }

    showPlayListsTable(title = "Playlist", catalogPlayLists) {


        $.get('templates/playLists.html', function (template) {
            let templateVarsP = {
                title : title,
                playLists: catalogPlayLists
            };
            let renderedPlayLists = Mustache.render(template, templateVarsP);
            $('#playLists').html(renderedPlayLists);
        });
    }

    showSongsTable(title = "Songs", catalogSongs) {

        $.get('templates/songs.html', function (template) {
            let templateVars = {
                title : title,
                songs: catalogSongs
            };
            let renderedSongs = Mustache.render(template, templateVars);
            $('#songs').html(renderedSongs);
        });
    }

}
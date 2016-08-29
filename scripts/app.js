(function () {

    // Create your own kinvey application

    let baseUrl = "https://baas.kinvey.com";
    let appKey = "kid_S1UgWa2P"; // Place your appKey from Kinvey here...
    let appSecret = "3913934a8f184e87aa38f578ee535d9d"; // Place your appSecret from Kinvey here...
    let _guestCredentials = "a2lkX1MxVWdXYTJQOjM5MTM5MzRhOGYxODRlODdhYTM4ZjU3OGVlNTM1ZDlk"; // Create a guest user using PostMan/RESTClient/Fiddler and place his authtoken here...


    //Create AuthorizationService and Requester

    let authService = new AuthorizationService(baseUrl,
        appKey,
        appSecret,
        _guestCredentials);
    authService.initAuthorizationType("Kinvey");
    let requester = new Requester(authService);

    let selector = ".wrapper";
    // let mainContentSelector = ".main-content";
    let navBarSelector = ".navBarSelector";
    // Create HomeView, HomeController, UserView, UserController, PostView and PostController

    let homeView = new HomeView(selector, navBarSelector);
    let homeController = new HomeController(homeView, requester, baseUrl, appKey);

    let userView = new UserView(selector, navBarSelector);
    let userController = new UserController(userView, requester, baseUrl, appKey);

    let songView = new SongView(selector, navBarSelector);
    let songController = new SongController(songView, requester, baseUrl, appKey);

    initEventServices();

    onRoute("#/", function () {
        // Check if user is logged in and if its not show the guest page, otherwise show the user page...
        if (!authService.isLoggedIn()) {
            homeController.showGuestPage();
        }
        else {
            homeController.showUserPage();
        }
    });


    onRoute("#/login", function () {
        userController.showLoginPage(authService.isLoggedIn());
    });

    onRoute("#/register", function () {
        userController.showRegisterPage(authService.isLoggedIn());
    });

    onRoute("#/logout", function () {
        userController.logout();
    });

    onRoute("#/songs", function () {
        if (!authService.isLoggedIn()) {
            homeController.showGuestPage();
        } else {
            songController.showSongsPage();
        }
    });

    onRoute("#/playlists", function () { 
        if (!authService.isLoggedIn()) {
            homeController.showGuestPage();
        } else {
            songController.showPlaylistsPage();
        }
    });

    onRoute("#/create-song", function () {
        if (!authService.isLoggedIn()) {
            homeController.showGuestPage();
        } else {
            songController.showCreateSongPage(authService.isLoggedIn());
        }
    });

    onRoute("#/create-playList", function () {
        if (!authService.isLoggedIn()) {
            homeController.showGuestPage();
        } else {
            songController.showCreatePlayListPage(authService.isLoggedIn());
        }
    });

    onRoute("#/editSong/:id", function () {
        songController.showEditSongPage(this.params['id']);
    });

    onRoute("#/editPlayList/:id", function () {
        songController.showEditPlayListPage(this.params['id']);
    });


    onRoute("#/viewPlaylist/:id", function () {
        songController.showViewPlaylist(this.params['id']);
    });

    onRoute("#/deleteSong/:id", function () {
        songController.showDeleteSongPage(this.params['id']);
    });

    onRoute("#/deletePlaylist/:id", function () {
        songController.showDeletePlaylistPage(this.params['id']);
    });

    onRoute("#/addSong/:id", function () {
        songController.showAddSongPage(this.params['id']);
    });

    bindEventHandler('login', function (ev, data) {
        userController.login(data);
    });

    bindEventHandler('register', function (ev, data) {
        // Register a new user...
        userController.register(data);
    });

    bindEventHandler('createSong', function (ev, data) {
        songController.createSong(data);
    });

    bindEventHandler('createPlayList', function (ev, data) {
        songController.createPlayList(data);
    });

    bindEventHandler('editSong', function (ev, data) {
        songController.editSong(data);
    });

    bindEventHandler('editPlayList', function (ev, data) {
        songController.editPlayList(data);
    });

    bindEventHandler('deleteSong', function (ev, data) {
        songController.deleteSong(data);
    });

    bindEventHandler('deletePlaylist', function (ev, data) {
        songController.deletePlaylist(data);
    });

    bindEventHandler('addSong', function (ev, data) {

        songController.addSong(data);
    });

    bindEventHandler('viewPlaylist', function (ev, data) {
        songController.viewPlaylist(data);
    });

    bindEventHandler('addSongToPlaylist', function (ev, data) {
        songController.addSongToPlaylist(data);
    });
    bindEventHandler('deleteSongFromPlaylist', function (ev, data) {
        songController.deleteSongFromPlaylist(data);
    });

    run('#/');
})();

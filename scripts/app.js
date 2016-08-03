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
    let mainContentSelector = ".main-content";
    // Create HomeView, HomeController, UserView, UserController, PostView and PostController

    let homeView = new HomeView(selector, mainContentSelector);
    let homeController = new HomeController(homeView, requester, baseUrl, appKey);
    let userView = new UserView(selector, mainContentSelector);
    let userController = new UserController(userView, requester, baseUrl, appKey);

    initEventServices();

    onRoute("#/",
        function () {
        // Check if user is logged in and if its not show the guest page, otherwise show the user page...
        if(!authService.isLoggedIn()){
            homeController.showGuestPage();
        }
        else{
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

    bindEventHandler('login', function (ev, data) {
        userController.login(data);
    });

    bindEventHandler('register', function (ev, data) {
        // Register a new user...
        userController.register(data);
    });

    run('#/');
})();

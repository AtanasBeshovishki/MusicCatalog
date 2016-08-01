// (function () {
let baseUrl = "https://baas.kinvey.com";
let appKey = "kid_S1UgWa2P";
let appSecret = "3913934a8f184e87aa38f578ee535d9d";
let appCredentials = "a2lkX1MxVWdXYTJQOjM5MTM5MzRhOGYxODRlODdhYTM4ZjU3OGVlNTM1ZDlk";

let authService = new AuthorizationService(baseUrl, appKey, appSecret, appCredentials);
let requester = new Requester(authService);

authService.initAuthorizationType("Kinvey");

let selector = ".wrapper";
let mainContentSelector = ".main-content";


let homeView = new HomeView(mainContentSelector, selector);
let homeController = new HomeController(homeView, requester, baseUrl, appKey);

// let userView = new UserView(mainContentSelector, selector);
// let userController = new UserController(userView, requester, baseUrl, appKey);
initEventServices();

onRoute("#/", function () {
    console.log("router");
    // if (authService.isLoggedIn()) {
    //     homeController.showUserPage();
    // }
    // else {
    homeController.showGuestPage();
    // }
});

onRoute("#/register", function () {
   console.log("register");
    homeController.showRegisterPage();
});




run('#/');
// });
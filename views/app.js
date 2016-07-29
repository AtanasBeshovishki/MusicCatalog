(function () {
    let baseUrl = "https://baas.kinvey.com";
    let appKey = "kid_S1UgWa2P";
    let appSecret = "3913934a8f184e87aa38f578ee535d9d";
    var _guestCredentials = "a2lkX1MxVWdXYTJQOjM5MTM5MzRhOGYxODRlODdhYTM4ZjU3OGVlNTM1ZDlk";

    let authService = new AuthorizationService(baseUrl, appKey, appSecret, _guestCredentials);
    let requester = new Requester(authService);

    authService.initAuthorizationType("Kinvey");
});
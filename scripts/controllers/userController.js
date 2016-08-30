class UserController {
    constructor(userView, requester, baseUrl, appKey) {
        this._userView = userView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/user/" + appKey + "/";
    }

    showLoginPage(isLoggedIn) {
        this._userView.showLoginPage(isLoggedIn);
    }

    showRegisterPage(isLoggedIn) {
        this._userView.showRegisterPage(isLoggedIn);

    }

    showUserInfo(){
        let _that = this;

        _that._userView.showUserInfo(null, null);

    }

    register(requestData) {
        if (requestData.username.length < 3) {
            showPopup('error', "Username must consist of at least 3 symbols.");
            return;
        }

        if (requestData.fullName.length < 3) {
            showPopup('error', "Full name must consist of at least 3 symbols.");
            return;
        }

        if (requestData.password.length < 3) {
            showPopup('error', "Password must consist of at least 3 symbols.");
            return;
        }

        if (requestData.password !== requestData.confirmPassword) {
            showPopup('error', "Password do not match.");
            return;
        }

        delete requestData['confirmPassword'];

        this._requester.post(this._baseServiceUrl, requestData,
            function success() {
                showPopup('success', "You have successfully registered.");
                redirectUrl("#/login");
            },
            function error() {
                showPopup('error', "An error has occurred while attempting to register.");
            });
    }

    login(requestData) {
        let requestUrl = this._baseServiceUrl + "login";

        this._requester.post(requestUrl, requestData,
            function success(data) {
                showPopup('success', "You have successfully logged in.");

                sessionStorage['_authToken'] = data._kmd.authtoken;
                sessionStorage['username'] = data.username;
                sessionStorage['fullName'] = data.fullName;

                redirectUrl("#/");

            },

            function error(data) {
                showPopup('error', "An error has occurred while attempting to login.");
            });
    }

    logout() {
        sessionStorage.clear();
        redirectUrl("#/");
    }
}
class HomeController {
    constructor(homeView, requester, baseUrl, appKey) {
        this._homeView = homeView;
        this.requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/appdata/" + appKey + "/posts";
    }
    showGuestPage() {
        let _that = this;
        let recentPosts = [];
        _that._homeView.showGuestPage(recentPosts);

    }

    showRegisterPage() {
        let _that = this;
        _that._homeView.showRegisterPage([]);
    }

    register(data) {
        console.log("aaaa");
        if (data.username.length < 6) {
            showPopup('error', 'The username...');
            return;
        }
        if (data.fullname.length < 5) {
            showPopup('error', 'The fullname...');
            return;
        }
        if (data.password != data.confirmPassword) {
            showPopup('error', 'The password...');
            return;
        }
        if (data.password.length < 8) {
            showPopup('error', 'The password...');
            return;
        }

        delete data['confirmPassword'];
        this.register.post(this._baseServiceUrl, data, function successCallback(response) {
            showPopup('success', 'Register successful');
            redirectUrl('#/login');
        }, function errorCallback(response) {
            showPopup('error', "Error, ....");
        });
    }

    showUserPage() {
        let _that = this;
        let recentPosts = [];
        this.requester.get(_that._baseServiceUrl, function success(data) {
            let currentId = 1;
            data.sort(function (elem1, elem2) {
                let date1 = new Date(elem1._kmd.ect);
                let date2 = new Date(elem2._kmd.ect);
                return date2 - date1;
            });
            for (let i = 0; i <  data.length && i < 5; i++){
                data[i].postId = currentId;
                currentId++;
                recentPosts.push(data[i]);
            }

            _that._homeView.showUserPage(recentPosts, data);
        }, function error(data) {
            showPopup('error', 'Error loading posts!');
        });
    }
}
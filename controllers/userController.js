class UserController {
    register(data) {
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
}

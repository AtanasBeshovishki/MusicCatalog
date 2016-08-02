class UserView {
    constructor(wrapperSelector, mainContentSelector){
        this._wrapperSelector = wrapperSelector;
        this._mainContentSelector = mainContentSelector;
    }

    showLoginPage(isLoggedIn){
        let _that = this;

        $.get('templates/login.html', function(template) {
            let rendered = Mustache.render(template, null);
            $(_that._wrapperSelector).html(rendered);

            $('#login-request-button').on('click', function (ev) {
                let username = $('#username').val();
                let password = $('#password').val();

                let data = {
                    username: username,
                    password: password
                };
                triggerEvent('login', data);
            })
        });
    }
    showRegisterPage(isLoggedIn){

    	console.log("showRegisterPage");

        let _that = this;
        $.get('templates/register.html', function(template) {
            let rendered = Mustache.render(template, null);
            $(_that._wrapperSelector).html(rendered);
            console.log("showRegisterPage2", _that._mainContentSelector);
            // $('#register-request-button').on('click', function () {
            //     let username = $('#username').val();
            //     let password = $('#password').val();
            //     let fullName = $('#full-name').val();
            //     let confirmPassword = $('#pass-confirm').val();
            //
            //     let data = {
            //         username:username,
            //         password:password,
            //         fullName:fullName,
            //         confirmPassword:confirmPassword
            //     };
            //     triggerEvent('register', data);
            // })
        });
    }
}
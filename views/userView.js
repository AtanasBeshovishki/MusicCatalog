class UserView {
    constructor(mainContentSelector, wrapperSelector) {
        this._mainContentSelector = mainContentSelector;
        this._wrapperSelector = wrapperSelector;
    }

    showLoginPage(isLoggedIn) {
        let _that = this;
        let requestTemplate = isLoggedIn ? 'templates/form-user.html' : 'templates/form-guest.html';
        $.get(requestTemplate, function (template) {
            let renderedTemplate = Mustache.render(template, null);

            $(_that._wrapperSelector).html(renderedTemplate);

            $.get('templates/login.html', function (template) {
                let renderedLogin = Mustache.render(template, null);
                $(_that._mainContentSelector).html(renderedLogin);
                $('#login-request-button').on('click', function () {
                    let username = $('#username').val();
                    let password = $('#password').val();

                    let data = {
                        username:username,
                        password:password
                    };
                    triggerEvent('login', data);
                })
            })
        });
    }

    showRegisterPage(isLoggedIn) {
        let _that = this;
        let requestTemplate = isLoggedIn ? 'templates/form-user.html' : 'templates/form-guest.html';
        $.get(requestTemplate, function (template) {
            let renderedTemplate = Mustache.render(template, null);

            $(_that._wrapperSelector).html(renderedTemplate);

            $.get('templates/register.html', function (template) {
                let renderedLogin = Mustache.render(template, null);
                $(_that._mainContentSelector).html(renderedLogin);
                $('#register-request-button').on('click', function () {
                    let username = $('#username').val();
                    let password = $('#password').val();
                    let confirmPassword = $('#pass-confirm').val();
                    let fullName = $('#full-name').val();

                    let data = {
                        username:username,
                        password:password,
                        fullname:fullName,
                        confirmPassword:confirmPassword
                    };
                    triggerEvent('register', data);
                })
            })
        });
    }
}
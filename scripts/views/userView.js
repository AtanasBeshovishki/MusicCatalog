class UserView {
    constructor(wrapperSelector, navBarSelector) {
        this._wrapperSelector = wrapperSelector;
        this._navBarSelector = navBarSelector;
    }

    showLoginPage() {
        let _that = this;

        // $.get("templates/navbarUser.html", function (template) {
        //     let rendered = Mustache.render(template, null);
        //     $(_that._navBarSelector).html(rendered);
        // });

        $.get('templates/login.html', function (template) {
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

    showRegisterPage() {

        let _that = this;
        $.get('templates/register.html', function (template) {
            let rendered = Mustache.render(template, null);
            $(_that._wrapperSelector).html(rendered);

            $('#register-request-button').on('click', function () {

                let username = $('#username').val();
                let password = $('#password').val();
                let fullName = $('#fullName').val();
                let confirmPassword = $('#confirmPassword').val();

                let data = {
                    username: username,
                    password: password,
                    fullName: fullName,
                    confirmPassword: confirmPassword
                };

                triggerEvent('register', data);
            })
        });
    }
}
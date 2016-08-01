class HomeView {
    constructor(mainContentSelector, wrapperSelector) {
        this._mainContentSelector = mainContentSelector;
        this._wrapperSelector = wrapperSelector;
    }

    showGuestPage() {
        let _that = this;
        $.get('templates/welcome-guest.html', function (template) {
            let renderedWrapper = Mustache.render(template, null);

            $(_that._wrapperSelector).html(renderedWrapper);
            // $.get('templates/posts.html', function (template) {
            //     let blogPosts = {
            //         blogPosts:mainData
            //     };
            //     let renderedPosts = Mustache.render(template, blogPosts);
            //     $('.articles').html(renderedPosts);
            // });

            // $.get('templates/recent-posts.html', function (template) {
            //     let recentPosts = {
            //         recentPosts:sidebarData
            //     };
            //     let renderedPosts = Mustache.render(template, recentPosts);
            //     $('.recent-posts').html(renderedPosts);
            // });
        });
    }


    showRegisterPage() {
        let _that = this;
        $.get('templates/register.html', function (template) {
            let renderedWrapper = Mustache.render(template, null);

            $(_that._wrapperSelector).html(renderedWrapper);
            $('#register-request-button').on('click', function () {
                console.log('eeee');
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
                console.log(data);
                triggerEvent('register', data);
            });
            // $.get('templates/posts.html', function (template) {
            //     let blogPosts = {
            //         blogPosts:mainData
            //     };
            //     let renderedPosts = Mustache.render(template, blogPosts);
            //     $('.articles').html(renderedPosts);
            // });

            // $.get('templates/recent-posts.html', function (template) {
            //     let recentPosts = {
            //         recentPosts:sidebarData
            //     };
            //     let renderedPosts = Mustache.render(template, recentPosts);
            //     $('.recent-posts').html(renderedPosts);
            // });
        });
    }


    showUserPage(sidebarData, mainData) {
        let _that = this;
        $.get('templates/welcome-user.html', function (template) {
            let renderedWrapper = Mustache.render(template, null);

            $(_that._wrapperSelector).html(renderedWrapper);
            $.get('templates/posts.html', function (template) {
                let blogPosts = {
                    blogPosts:mainData
                };
                let renderedPosts = Mustache.render(template, blogPosts);
                $('.articles').html(renderedPosts);
            });

            $.get('templates/recent-posts.html', function (template) {
                let recentPosts = {
                    recentPosts:sidebarData
                };
                let renderedPosts = Mustache.render(template, recentPosts);
                $('.recent-posts').html(renderedPosts);
            });
        });
    }
}
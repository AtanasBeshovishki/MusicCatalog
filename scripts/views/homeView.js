class HomeView {
    constructor(wrapperSelector, mainContentSelector) {
        this._wrapperSelector = wrapperSelector;
        this._mainContentSelector = mainContentSelector;
    }

    showGuestPage() {
        let _that = this;

        $.get('templates/welcome-guest.html', function (template) {
            let renderedWrapper = Mustache.render(template, null);
            $(_that._wrapperSelector).html(renderedWrapper);
        });
    }

    showUserPage() {
        let _that = this;

        $.get('templates/welcome-user.html', function (template) {
            let rendered = Mustache.render(template, null);
            $(_that._wrapperSelector).html(rendered);
        });
    }

//    showUserPage(sideBarData, mainData){
//
//        let _that = this;
//
//        $.get('templates/welcome-user.html', function (template) {
//            let renderedWrapper = Mustache.render(template, null);
//
//            $(_that._wrapperSelector).html(renderedWrapper);
//
//            $.get('templates/posts.html', function (template) {
//                let blogPosts = {
//                    blogPosts: mainData
//                };
//                let renderedPosts = Mustache.render(template, blogPosts);
//                $('.articles').html(renderedPosts);
//            });
//
//            $.get('templates/recent-posts.html', function (template) {
//                let recentPosts = {
//                    recentPosts: sideBarData
//                };
//                let renderedRecentPosts = Mustache.render(template, recentPosts);
//                $('.recent-posts').html(renderedRecentPosts);
//
//
//            });
//        });
//    }
}
angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    var routeRoleChecks = {
     admin:  { auth: function(mvAuth) {
         return mvAuth.authorizeCurrentUserForRoute('admin')
        }},
        
     user:  { auth: function(mvAuth) {
         return mvAuth.authorizeAuthenticatedUserForRoute()
        }}
    }
    
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', { templateUrl: '/partials/main/main', controller: 'mvMainCtrl'})
        .when('/admin/users', { templateUrl: '/partials/admin/user-list',
            controller: 'mvUserListCtrl', resolve: routeRoleChecks.admin
            //------------
            // after routeRoleChecks gives 'admin' as return,
            // then /admin/users directory is being open
        })
        .when('/signup', { templateUrl: '/partials/account/signup',
            controller: 'mvSignupCtrl',
            // Everybody can access
        })
        .when('/profile', { templateUrl: '/partials/account/profilesignup',
            controller: 'mvProfileCtrl', resolve: routeRoleChecks.user
        })
        .when('/courses', { templateUrl: '/partials/courses/course-list',
            controller: 'mvCourseListCtrl' //anyone can access
        })
        .when('/courses/:id', { templateUrl: '/partials/courses/course-details',
            controller: 'mvCourseCtrl' //anyone can access
        });
});

angular.module('app').run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        if(rejection === 'not authorized') {
            $location.path('/');
        }
    });
})
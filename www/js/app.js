//Module used for local storage
/*angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', function($window) {
    
  return 
  {
      
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
      
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
      
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
      
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
      
  }
  
}]);*/

//storing in variable for better readability
var christyApp = angular.module('activityApp', ['ionic']);

//Config function used to set up routing in app
christyApp.config(function($stateProvider, $urlRouterProvider) 
{
          //all states for app
          $stateProvider
          
          //Parent state for app, houses the tabs fro each page 
          .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: "tabs.html"
          })
          
          //Child states for each view app has
          .state('tab.home', {
            url: '/home',
            views: {
              'home': {
                templateUrl: 'home.html',
                controller: 'stopwatchCtrl'
              }
            }
          })
          
          .state('tab.list', {
            url: '/list',
            views: {
              'list': {
                templateUrl: 'list.html',
                controller: 'inputCtrl'
              }
            }
          })
          
          .state('tab.input', {
            url: '/input',
            views: {
              'input': {
                templateUrl: 'input.html',
                controller: 'inputCtrl'
              }
            }
          });
    
          //Defaults back to home page
          $urlRouterProvider.otherwise('/tab/home');

});//End config()

/*
christyApp.run(function($localstorage) {

  $localstorage.set('name', 'Max');
  console.log($localstorage.get('name'));
  $localstorage.setObject('post', {
    name: 'Thoughts',
    text: 'Today was a good day'
  });

  var post = $localstorage.getObject('post');
  var post = $localstorage.getObject('post');
  console.log(post);
});*/

christyApp.run(function($ionicPlatform) 
{
    
     $ionicPlatform.ready(function() 
  {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) 
    {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
      
    if(window.StatusBar)
    {
      StatusBar.styleDefault();
    }
      
  });
    
});//End run()

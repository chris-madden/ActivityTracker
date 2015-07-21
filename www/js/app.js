//storing in variable for better readability
var christyApp = angular.module('calorific', ['ionic']);

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
                controller: 'dailyCalories'
              }
            }
          })
          
          .state('tab.list', {
            url: '/list',
            views: {
              'list': {
                templateUrl: 'list.html',
                controller: 'listCtrl'
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

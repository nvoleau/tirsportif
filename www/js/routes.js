angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
    .state('menu', {
      url: '/side-menu',
      abstract:true,
      templateUrl: 'templates/menu.html'
    })
      
    
      
        
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
        
      
    
      
        
    .state('creerUnCompte', {
      url: '/signup',
      templateUrl: 'templates/creerUnCompte.html',
      controller: 'creerUnCompteCtrl'
    })
        
      
    
      
        
    .state('menu.mesEntrainements', {
      url: '/list-entrainements',
      views: {
        'side-menu': {
          templateUrl: 'templates/mesEntrainements.html',
          controller: 'mesEntrainementsCtrl'
        }
      }
    })
        
            
        
    .state('menu.resume', {
      url: '/resume',
       views: {
        'side-menu' :{
      templateUrl: 'templates/resume.html',
      controller: 'resumeCtrl'
           }
      }
    })
        
      
 .state('menu.competitions', {
      url: '/list-competitions',
      views: {
        'side-menu': {
          templateUrl: 'templates/competitions.html',
          controller: 'competitionsCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
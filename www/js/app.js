// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var apptir = angular.module('app', ['ionic','chart.js','app.controllers','app.controllersComp','app.routes', 'app.services','app.servicesComp', 'app.directives','ionic-material', 'ionMdInput','nvd3']);



//var remoteDB = new PouchDB("http://[your database server ip]:5984/todos");

apptir.run(function($ionicPlatform) {
    //localDB.sync(remoteDB, {live: true, retry: true}); qd j'aurais la bdd remote
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }  
 
  var db="";
    });

})
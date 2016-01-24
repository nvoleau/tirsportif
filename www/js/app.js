// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic','ngCouchbaseLite', 'app.controllers', 'app.routes', 'app.services', 'app.directives','ionic-material', 'ionMdInput'])

.run(function($ionicPlatform, $couchbase) {
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

     var db = null;

if(!window.cblite) {
            alert("Couchbase Lite is not installed!");
        } else {
            cblite.getURL(function(err, url) {
                if(err) {
                    alert("There was an error getting the database URL");
                    return;
                }
                db = new $couchbase(url, "tirsportif");
                // 2
                db.createDatabase().then(function(result) {
                    var todoViews = {
                        lists: {
                            map: function(doc) {
                                if(doc.type == "list" && doc.title) {
                                    emit(doc._id, {title: doc.title, rev: doc._rev})
                                }
                            }.toString()
                        },
                        tasks: {
                            map: function(doc) {
                                if(doc.type == "task" && doc.title && doc.list_id) {
                                    emit(doc.list_id, {title: doc.title, list_id: doc.list_id, rev: doc._rev})
                                }
                            }.toString()
                        }
                    };
                    db.createDesignDocument("_design/todo", todoViews);
                    db.listen();
                }, function(error) {
                    // There was an error creating the database
                });
             });
         }
    });
})
angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])
//http://frontmag.no/artikler/utvikling/offline-data-synchronization-ionic
.factory('PouchDBListener', ['$rootScope', function($rootScope) {
	console.log('dans le factory');
 localDB.changes({
 	since: 'now',
  live: true,
   continuous: true,
   onChange: function(change) {
   	console.log(change);
     if (!change.deleted) {
       $rootScope.$apply(function() {
         localDB.get(change.id, function(err, doc) {
           $rootScope.$apply(function() {
             if (err) console.log(err);
             $rootScope.$broadcast('add', doc);
           })
         });
       })
     } else {
       $rootScope.$apply(function() {
         $rootScope.$broadcast('delete', change.id);
       });
     }
   }
 });
 return true;
}]);


angular.module('app.controllers', [])
     
.controller('loginCtrl', function($scope) {

})
   
.controller('creerUnCompteCtrl', function($scope) {

})
   
.controller('mesEntrainementsCtrl', function($scope, $ionicPopup, PouchDBListener) {

$scope.entrainements = [];
 $scope.create = function() {
   $ionicPopup.prompt({
     title: 'Un nouvel Entrainement',
     inputType: 'text'
   })
   .then(function(result) {
     console.log(result);
     if(result) {
       //if($scope.hasOwnProperty("Entrainement") !== true) {
        // $scope.entrainements = [];
       //}
       localDB.post({title: result, done: false})
       .then(function(response){
             console.log(response);
        }).catch(function(err){
            console.log(err);
        });
     } else {
       console.log("Action cancelled.");
     }
   });
 }

 $scope.update = function(entrainement) {
   localDB.put({
     _id: entrainement._id,
     _rev: entrainement._rev,
     title: entrainement.title,
     done: entrainement.done
   })
   .then(function(result){
     // You can set some action after the item was updated.
   });
 }
 $scope.$on('add', function(event, entrainement) {
   var add = true;
    console.log('dans le add');
   angular.forEach($scope.entrainements, function(value, key) {
     if (value._id == entrainement._id) {
       $scope.entrainements[key] = entrainement;
       add = false;
       return;
     }
   });
   if (add) {
     $scope.entrainements.push(entrainement);
   }
 });

 $scope.$on('delete', function(event, id) {
   for(var i = 0; i < $scope.entrainements.length; i++) {
     if($scope.entrainements[i]._id === id) {
       $scope.entrainements.splice(i, 1);
     }
   }
 });

})
   
.controller('entrainementCtrl', function($scope) {

})
   
.controller('resumeCtrl', function($scope) {

})
 
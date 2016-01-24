angular.module('app.controllers', [])
     
.controller('loginCtrl', function($scope) {

})
   
.controller('creerUnCompteCtrl', function($scope) {

})
   
.controller('mesEntrainementsCtrl', function($scope) {

	 $scope.lists = { };

    $scope.insert = function() {
    	$ionicPopup.prompt({
        discipline: 'Enter un nouvel entrainement',
        inputType: 'text'
    })
    .then(function(result) {
        var obj = {
            discipline: result,
            type: "list",
        };
        db.createDocument(obj).then(function(result) {
            // The document was saved
        }, function(error) {
            // There was an error saving the document
        });
    });

     };

    $scope.delete = function(list) { };

 //    db.queryView("_design/entrainement", "lists").then(function(result) {
 //    for(var i = 0; i < result.rows.length; i++) {
 //        $scope.lists[result.rows[i].id] = result.rows[i].value;
 //    }
	// }, function(error) {
 //    // There was an error querying the view
	// });

})
   
.controller('entrainementCtrl', function($scope) {

})
   
.controller('resumeCtrl', function($scope) {

})
 
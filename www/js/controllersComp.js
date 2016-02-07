angular.module('app.controllersComp', [])

.controller('competitionsCtrl', function($scope, $ionicModal,$ionicPlatform,competitionService) {

    //$scope.competitions = competitions;
    $ionicPlatform.ready(function() {
       	competitionService.initDB(); 
        // Get all birthday records from the database.
        competitionService.getAllCompetitions().then(function(competitions) {
        	console.log(competitions);
				$scope.competitions = competitions;

        });
    });

     //le "." est important sinon le dialog ne se montre pas sur device
  $ionicModal.fromTemplateUrl('./templates/compet.html', {
  scope: $scope,
  animation: 'slide-in-up',
 // backdropClickToClose: false,
  //hardwareBackButtonClose: false,
	  focusFirstInput: true
	}).then(function(modal) {
	  $scope.modal = modal;
	  console.log($scope.modal);
	});	


	  $ionicModal.fromTemplateUrl('./templates/tir.html', {
		  scope: $scope,
		  animation: 'slide-in-up',
		 // backdropClickToClose: false,
		  //hardwareBackButtonClose: false,
			  focusFirstInput: true
			}).then(function(modal) {
			  $scope.modalStartCompet = modal;
			});	



    $scope.showAddCompetitionModal = function() {
        $scope.competition = {};
        $scope.competition.type="competition";
        $scope.action = 'Add';
        $scope.isAdd = true;
        console.log("add")
        $scope.modal.show();           
    };


    $scope.startCompet = function() {
        console.log("Start")
        $scope.modalStartCompet.show();           
    };

    $scope.setPoint = function(nb) {
        console.log("nb point "+nb); 
        $scope.point=nb;         
    };

    $scope.setDecimal = function(nb) {
        console.log("nb decimal "+nb); 
        console.log("nb point "+$scope.point); 
        $scope.point=$scope.point+nb;         
    };

});   

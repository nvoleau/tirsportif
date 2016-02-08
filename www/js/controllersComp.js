angular.module('app.controllersComp', [])

.controller('competitionsCtrl', function($scope, $ionicModal,$ionicPlatform,competitionService) {


var points=[];

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


var shoot = null;
var evt = null;

    $scope.startCompet = function() {
        shoot = 1;
        evt = 1;
        var tir = {};
        tir.evt=0;
        tir.action="Start";
        tir.date = new Date();
        points.push(tir);

        $scope.point = 0;
        console.log("Start " + shoot);
        $scope.modalStartCompet.show();           
    };

   
 

    $scope.nextShoot = function() {
        var tir = {};
        tir.action="tir";
        tir.evt = evt;
        tir.nb = shoot;        
        tir.points = $scope.point;
        tir.date = new Date();

        //on reinit
        $scope.point = 0;
        shoot=shoot + 1;
        evt = evt + 1;     

        console.log(tir);
        points.push(tir);
        console.log(points);
    };



    $scope.setPauseDeb = function() {
        var tir = {};
        tir.action="Pause";
        tir.evt = evt;
        tir.date = new Date();
        //on reinit
        $scope.point = 0;
        evt = evt + 1;
        points.push(tir);
        console.log(points);
    };

    $scope.setPauseFin = function() {
        var tir = {};
        tir.action="Pause";
        tir.evt = evt;
        tir.date = new Date();
        //on reinit
        $scope.point = 0;
        evt = evt + 1;
        points.push(tir);
        console.log(points);
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

angular.module('app.controllersComp', [])

.controller('competitionsCtrl', function($scope, $ionicModal,$ionicPlatform,competitionService) {

	$scope.b_pauseDeb=true;
	$scope.b_pauseFin=false;

var points=[];
var total = 0;

    //$scope.competitions = competitions;
    $ionicPlatform.ready(function() {
       	competitionService.initDB(); 
        // Get all birthday records from the database.
         console.log("---------------avnt competitions-----------");
        competitionService.getAllCompetitions().then(function(competitions) {
            console.log("---------------competitions-----------");
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
        $scope.competition.seance = {};
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

        $scope.shoot=shoot;
        $scope.point = 0;
        $scope.b_unite=true; 
        $scope.b_decimal=false; 
        console.log("Start " + shoot);
        //on ouvre la fenetre
        $scope.modalStartCompet.show();           
    };

   
 

    $scope.nextShoot = nextShoot();

    function nextShoot(){
        //total de points
        total = total + $scope.points;

         var tir = {};
        tir.action="tir";
        tir.evt = evt;
        tir.nb = shoot;        
        tir.points = $scope.point;
        tir.date = new Date();
        console.log(tir);
        points.push(tir);
        console.log(points);

        //on reinit
        $scope.point = 0;
        shoot=shoot + 1;
        $scope.shoot=shoot;
        evt = evt + 1;   
        $scope.b_unite=true;  
        $scope.b_decimal=false; 


        if(shoot==5){
            console.log("save");
            saveCompetition();
        }
   

        
        
    }



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

        $scope.b_pauseDeb=false;
		$scope.b_pauseFin=true;
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
        //console.log(points);
        $scope.b_pauseDeb=true;
		$scope.b_pauseFin=false;
    };


    $scope.setPoint = function(nb) {
        console.log("nb point "+nb); 
        $scope.point=nb;

        if(nb==0 || nb==10){
            nextShoot();
        }else{
            $scope.b_unite=false; 
            $scope.b_decimal=true;   
        }      
    };

    $scope.setDecimal = function(nb) {
        //console.log("nb decimal "+nb); 
        //console.log("nb point "+$scope.point); 
        $scope.point=$scope.point+nb; 
        $scope.b_unite=true;   
        $scope.b_decimal=false; 
        nextShoot();     
    };


    //enregistrement de la compétition
    function saveCompetition(){
            $scope.competition.seance = points;
            $scope.competition.total = total;
            console.log($scope.competition);
           competitionService.addCompetition($scope.competition); 
           $scope.modalStartCompet.hide();       
    }

});   

angular.module('app.controllersComp', [])

.controller('competitionsCtrl', function($scope, $ionicModal,$ionicPlatform,competitionService) {

	$scope.b_pauseDeb=true;
	$scope.b_pauseFin=false;

var points=[];


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

        //var seea
         
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
var total = 0;

    $scope.startCompet = function() {
        shoot = 1;
        evt = 1;
        var tir = {};
        tir.evt=0;
        tir.action="Start";
        tir.date = new Date();
        points.push(tir);

        $scope.shoot=shoot;
        $scope.total = 0;
        $scope.point = 0;
        $scope.b_unite=true; 
        $scope.b_decimal=false; 
        $scope.competition.date_start = new Date();
        console.log("Start " + shoot);
        //on ouvre la fenetre
        $scope.modalStartCompet.show();           
    };

   
 

    $scope.nextShoot = nextShoot();

    function nextShoot(){
        //total de points
        $scope.total = $scope.total + $scope.point;

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


        if(shoot==15){
            console.log("save");
            saveCompetition();
        }
   

        
        
    }



    $scope.setPauseDeb = function() {
        var tir = {};
        tir.action="pause";
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
        tir.action="pause";
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
            $scope.competition.total = $scope.total ;
            $scope.competition.date_stop = new Date();
            console.log('-------save---------')
            console.log($scope.competition);
           competitionService.addCompetition($scope.competition); 
           console.log('------- finsave---------')
           $scope.modalStartCompet.hide();  
           $scope.modal.hide();     
    }



//SHOW COMPET
  //le "." est important sinon le dialog ne se montre pas sur device
    $ionicModal.fromTemplateUrl('./templates/showcompet.html', {
  scope: $scope,
  animation: 'slide-in-up',
 // backdropClickToClose: false,
  //hardwareBackButtonClose: false,
  focusFirstInput: true
}).then(function(modal) {
  $scope.showcompet = modal;
  console.log($scope.modal);
});

  $scope.showEditCompetitionModal = function(competition) {
        $scope.competition = competition;
        $scope.data = setDataGraph(competition.seance);
        $scope.action = 'Edit';
        //$scope.isAdd = false;          
        $scope.showcompet.show();

    };



//graphique
//$scope.data = setDataGraph($scope.competition.seance);

  function setDataGraph(seance) {
            var aTir = [];
            var aPause = [];


            //Data is represented as an array of {x,y} pairs.
            for (var i = 0; i < seance.length; i++) {
                if (seance[i].action=='tir'){
                    aTir.push({x:new Date(seance[i].date),y:seance[i].points})
                }else if(seance[i].action=='pause'){
                    aPause.push({x:new Date(seance[i].date),y:10})
                }
                
            }

            //Line chart data should be sent as an array of series objects.
            return [
                {
                    values: aTir,      //values - represents the array of {x,y} data points
                    key: 'Points', //key  - the name of the series.
                    color: '#ff7f0e',  //color - optional: choose your own line color.
                    //strokeWidth: 2,
                    //classed: 'dashed'
                }/**,
                {
                    values: aSerrage,
                    key: 'Serrage',
                    color: '#2ca02c'
                }*/ ,
                {
                    values: aPause,
                    key: 'Pause',
                    color: '#7777ff',
                    area: true      //area - set to true if you want this line to turn into a filled area chart.
                }
            ];
        };


$scope.options = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function(d){ return d.x; },
                y: function(d){ return d.y; },
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Date',
                    tickFormat: function(d) {
                        return d3.time.format('%H:%M:%S')(new Date(d))
                    }
                },
                yAxis: {
                    axisLabel: 'Points',
                    tickFormat: function(d){
                        return d3.format('.0f')(d);
                    },
                    axisLabelDistance: -10
                },
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            },
            title: {
                enable: true,
                text: 'Competition'
            },
            subtitle: {
                enable: false,
                text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
                css: {
                    'text-align': 'center',
                    'margin': '10px 13px 0px 7px'
                }
            },
            caption: {
                enable: false,
                html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style="text-decoration: underline;">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style="color: darkred;">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
                css: {
                    'text-align': 'justify',
                    'margin': '10px 13px 0px 7px'
                }
            }
        };



});   

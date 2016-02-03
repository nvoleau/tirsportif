angular.module('app.controllers', [])
     
.controller('loginCtrl', function($scope) {

})
   
.controller('creerUnCompteCtrl', function($scope) {

})
   

.controller('mesEntrainementsCtrl', function($scope, $ionicModal, $ionicPlatform, entrainementService) {

 
    // Initialize the database.
    $ionicPlatform.ready(function() {
        entrainementService.initDB();
        console.log("list des entrainements");  
        // Get all birthday records from the database.
        entrainementService.getAllEntrainements().then(function(entrainements) {
            $scope.entrainements = entrainements;
        });
    });

    // Initialize the modal view.
    $ionicModal.fromTemplateUrl('/templates/entrainement.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
        console.log("dans modal")
    });

    $scope.showAddEntrainementModal = function() {
        $scope.entrainement = {};
        $scope.entrainement.technique ={}
        $scope.entrainement.technique.serrage=0;
        $scope.entrainement.technique.prisemain=0;
        $scope.entrainement.technique.lacher=0;
        $scope.entrainement.technique.position=0;
        $scope.entrainement.technique.tas=0;
        $scope.entrainement.technique.visee=0;
        $scope.entrainement.technique.tenue=0;
        $scope.action = 'Add';
        $scope.isAdd = true;
        console.log("add")
        $scope.modal.show();           
    };

    $scope.showEditEntrainementModal = function(entrainement) {
        $scope.entrainement = entrainement;
        $scope.action = 'Edit';
        $scope.isAdd = false;          
        $scope.modal.show();

    };

    $scope.saveEntrainement = function() {
        if ($scope.isAdd) {
            entrainementService.addEntrainement($scope.entrainement);              
        } else {
            entrainementService.updateEntrainement($scope.entrainement);               
        }                       
        $scope.modal.hide();
    };

    $scope.deleteEntrainement = function() {
        entrainementService.deleteEntrainement($scope.entrainement);           
        $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
        $scope.modal.remove(); 
    });

    //return vm;

})
   
   
.controller('resumeCtrl', function($scope, $ionicPlatform,entrainementService) {

    //pie chart
    $scope.options = {
        chart: {
            type: 'pieChart',
            height: 500,
            x: function(d){return d.Name;},
            y: function(d){return d.technique.prisemain;},
            showLabels: true,
            duration: 500,
            labelThreshold: 0.01,
            labelSunbeamLayout: true,
            legend: {
              margin: {
                top: 5,
                right: 35,
                bottom: 5,
                left: 0
              }
            }
          }
    };

      
        // Initialize the database.
    $ionicPlatform.ready(function() {
        entrainementService.initDB();
        console.log("list des entrainements");  
        // Get all birthday records from the database.
        entrainementService.getAllEntrainements().then(function(entrainements) {
              var aPrise = [];
            $scope.data = entrainements;

            t = entrainements;

            for (var i = 0; i < t.length; i++) {
                console.log(t[i].Date);
                aPrise.push({x: t[i].Date, y: t[i].technique.prisemain});
            }

            $scope.dataTps=[
                {
                    values: aPrise,      //values - represents the array of {x,y} data points
                    key: 'Prise en main', //key  - the name of the series.
                    color: '#ff7f0e'  //color - optional: choose your own line color.
                }
            ];

            //console.log($scope.dataTps);

           
        });
    });
        //et=entrainementService.getAllEntrainements();
        //entrainementService.getAllEntrainements().then(function(entrainements) {
          //  $scope.entrainements = entrainements;
        //});


$scope.optionsTps = {
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
                        return d3.time.format('%m/%d/%y')(new Date(d));
                    },
                    showMaxMin: false,
                    staggerLabels: true
                },
                yAxis: {
                    axisLabel: 'point (v)',
                    axisLabelDistance: -10
                },
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            },
            title: {
                enable: true,
                text: 'Title for Line Chart'
            },
            subtitle: {
                enable: true,
                text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
                css: {
                    'text-align': 'center',
                    'margin': '10px 13px 0px 7px'
                }
            },
            caption: {
                enable: true,
                html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style="text-decoration: underline;">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style="color: darkred;">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
                css: {
                    'text-align': 'justify',
                    'margin': '10px 13px 0px 7px'
                }
            }
        };

   

})
 
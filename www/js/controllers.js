angular.module('app.controllers', [])
     
.controller('loginCtrl', function($scope) {

})
   
.controller('creerUnCompteCtrl', function($scope) {

})
   

.controller('mesEntrainementsCtrl', function($scope, $ionicModal, $ionicPlatform, entrainementService) {

 
    // Initialize the database.
    $ionicPlatform.ready(function() {
        entrainementService.initDB();
         
        // Get all birthday records from the database.
        entrainementService.getAllEntrainements().then(function(entrainements) {
            //console.log("list des entrainements"); 
            //console.log(entrainements);
            $scope.entrainements = entrainements;
        });
    });


    //le "." est important sinon le dialog ne se montre pas sur device
    $ionicModal.fromTemplateUrl('./templates/entrainement.html', {
  scope: $scope,
  animation: 'slide-in-up',
 // backdropClickToClose: false,
  //hardwareBackButtonClose: false,
  focusFirstInput: true
}).then(function(modal) {
  $scope.modal = modal;
  console.log($scope.modal);
});

    $scope.showAddEntrainementModal = function() {
        $scope.entrainement = {};
        $scope.entrainement.type="entrainement";
        $scope.entrainement.technique ={};
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

 //$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    //$scope.series = ['Series A', 'Series B'];
   // $scope.data = [
     //   [65, 59, 80, 81, 56, 55, 40],
      //  [28, 48, 40, 19, 86, 27, 90]
    //];

      
        // Initialize the database.
    $ionicPlatform.ready(function() {
        entrainementService.initDB(); 
        // Get all birthday records from the database.
        entrainementService.getAllEntrainements().then(function(entrainements) {
              var aAction=[];
              var aPrise = [];
              var aSerrage = [];
                var aLacher = [];
            //$scope.data = entrainements;

            t = entrainements;

            //console.log(entrainements);

            for (var i = 0; i < t.length; i++) {
                //console.log(t[i].Language);
                
                    //aAction.push(i+1);
                    aPrise.push(t[i].technique.prisemain);
                    aSerrage.push(t[i].technique.serrage);
                    aLacher.push(t[i].technique.lacher);
               
            }

            $scope.data = setDataGraph(entrainements);

        });

        entrainementService.getLastEntrainement().then(function(e){
            console.log("juste");
                console.log(e);
                $scope.dataDonut = lastEntrainement(e);

            });


    });
        
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
                        return d3.time.format('%d-%m-%y')(new Date(d))
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
                text: 'Suivis des entrainement'
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

        //$scope.datatt = sinAndCos();

   
        function setDataGraph(entrainements) {
            var aPrise = [];
              var aSerrage = [];
                var aLacher = [];

            //Data is represented as an array of {x,y} pairs.
            for (var i = 0; i < entrainements.length; i++) {
                aPrise.push({x:entrainements[i].Date,y:entrainements[i].technique.prisemain})
                aSerrage.push({x:entrainements[i].Date,y:entrainements[i].technique.serrage})
                aLacher.push({x:entrainements[i].Date,y:entrainements[i].technique.lacher})
            }

            //Line chart data should be sent as an array of series objects.
            return [
                {
                    values: aPrise,      //values - represents the array of {x,y} data points
                    key: 'Prise en main', //key  - the name of the series.
                    color: '#ff7f0e',  //color - optional: choose your own line color.
                    //strokeWidth: 2,
                    //classed: 'dashed'
                },
                {
                    values: aSerrage,
                    key: 'Serrage',
                    color: '#2ca02c'
                },
                {
                    values: aLacher,
                    key: 'Lacher',
                    color: '#7777ff',
                    //area: true      //area - set to true if you want this line to turn into a filled area chart.
                }
            ];
        };


        //chart Donut dernier entrainement
        //http://krispo.github.io/angular-nvd3/#/donutChart

         $scope.optionsDonut = {
            chart: {
                type: 'pieChart',
                height: 450,
                donut: true,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,

               // pie: {
                 //   startAngle: function(d) { return d.startAngle/2 -Math.PI/2 },
                   // endAngle: function(d) { return d.endAngle/2 -Math.PI/2 }
                //},
                duration: 500,
                legend: {
                    margin: {
                        top: 5,
                        right: 70,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        function lastEntrainement(entrainement){
            console.log('entrainement.technique.prisemain');
            console.log(entrainement[0]);
            console.log(entrainement[0].technique.prisemain);

            for (var i = 0; i < entrainement.length; i++) {
                console.log(entrainement[i].technique.prisemain);
            }


             return [
                {
                    key: "Prise en main",      //values - represents the array of {x,y} data points
                    y:entrainement[0].technique.prisemain
                },
                {
                    key: "Serrage",      //values - represents the array of {x,y} data points
                    y:entrainement[0].technique.serrage
                },
                {
                     key: "Lacher",      //values - represents the array of {x,y} data points
                    y:entrainement[0].technique.lacher
                }
            ];
        }

})
 
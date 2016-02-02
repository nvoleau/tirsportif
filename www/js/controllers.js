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
   
.controller('entrainementCtrl', function($scope) {

})
   
.controller('resumeCtrl', function($scope) {

})
 
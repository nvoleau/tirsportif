angular.module('app.controllers', [])
     
.controller('loginCtrl', function($scope) {

})
   
.controller('creerUnCompteCtrl', function($scope) {

})
   

.controller('mesEntrainementsCtrl', function($scope, $ionicModal, ionicPlatform, entrainementService) {
	 var vm = this;

    // Initialize the database.
    $ionicPlatform.ready(function() {
        entrainementService.initDB();

        // Get all birthday records from the database.
        entrainementService.getAllEntrainements().then(function(entrainements) {
            vm.entrainements = entrainements;
        });
    });

    // Initialize the modal view.
    $ionicModal.fromTemplateUrl('entrainement.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    vm.showAddEntrainementModal = function() {
        $scope.entrainement = {};
        $scope.action = 'Add';
        $scope.isAdd = true;
        $scope.modal.show();           
    };

    vm.showEditEntrainementModal = function(entrainement) {
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

    return vm;

})
   
.controller('entrainementCtrl', function($scope) {

})
   
.controller('resumeCtrl', function($scope) {

})
 
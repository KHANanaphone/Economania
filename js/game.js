(function(){
    
var eco = angular.module('economania', []);

    eco.controller('game', function ($scope) {

        $scope.setScreen = function(screen, save){
            
            $scope.screen = screen;
            
            if(save)
                $scope.save();
        };
        
        $scope.newGame = function(slot){
            
            $scope.slot = slot;
            $scope.company = new Company();
        };
        
        $scope.difficultySelected = function(diff){
        
            $scope.company.difficulty = diff;
        };
        
        $scope.save = function(){
            
            debugger;
            $scope.company.screen = $scope.screen;
            
            localStorage[$scope.storageName + 'Slot'] = $scope.slot;
            localStorage[$scope.storageName + 'Company' + $scope.slot] 
                = $scope.company.generateSaveData();
        };
        
        $scope.loadSaves = function(){
            
            $scope.files = [];
            
            for(var i = 0; i < 3; i++){
                var company = localStorage[$scope.storageName + 'Company' + i];
                $scope.files[i] = company ? new Company(company) : null;
            };
        };
        
        $scope.fileSelected = function(slot){
            
            $scope.loadSlot(slot);
        };
        
        $scope.loadFromLocalStorage = function(){

            var prefix = $scope.storageName;
            var slot = localStorage[prefix + 'Slot'];

            if(slot) $scope.slot = parseInt(slot);
            else return $scope.slot = -1;

            $scope.loadSlot($scope.slot);
        };
        
        $scope.loadSlot = function(slot){
            
            var prefix = $scope.storageName;
            var company = new Company(localStorage[prefix + 'Company' + slot]);
            $scope.screen = company.screen;
            $scope.company = company;
        }

        $scope.storageName = $scope.storageName ? $scope.storageName : 'eco';
        $scope.loadFromLocalStorage();

        if($scope.slot == -1)
            $scope.setScreen('mainMenu');
    });    
})();

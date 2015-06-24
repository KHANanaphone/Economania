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
            $scope.setScreen('difficultySelect');
        };
        
        $scope.difficultySelected = function(diff){
            
            $scope.company.difficulty = diff;
            $scope.setScreen('planet', true);
        };
        
        $scope.save = function(){
            
            localStorage[$scope.storageName + 'Company' + $scope.slot] 
                = $scope.company.generateSaveData();
        };

        $scope.storageName = $scope.storageName ? $scope.storageName : 'eco';
        loadFromLocalStorage($scope);

        if($scope.slot == 0)
            $scope.setScreen('mainMenu');
    });

    //loads game info from local storage. if there is none, or the slot is set to 0,
    //then we'll just be going to the main menu instead
    function loadFromLocalStorage($scope){

        var prefix = $scope.storageName;
        var slot = localStorage[prefix + 'Slot'];

        if(slot) $scope.slot = parseInt(slot);
        else return $scope.slot = 0;
        
        $scope.screen =  localStorage[prefix + 'Screen' + slot];
        $scope.company = Company.createFromSavedData(localStorage[prefix + 'Company' + slot]);
    };
    
})();

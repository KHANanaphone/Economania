(function(){
    
var eco = angular.module('economania', []);

    eco.controller('ecoController', function ($scope) {

        $scope.SCREEN_NAMES = [
            'company',
            'difficultySelect',
            'event',
            'fileSelect',
            'mainMenu',
            'options',
            'planet',
            'ship'
        ];
        
        $scope.setScreen = function(screen, save){
            
            $scope.prevScreen = $scope.screen;
            $scope.screen = screen;
            
            if(save)
                $scope.save();
        };
        
        $scope.back = function(){
            
            if(!$scope.prevScreen)
                return;
            
            $scope.setScreen($scope.prevScreen);
            $scope.prevScreen = null;
        };
        
        $scope.saveAndQuit = function(){
            
            $scope.setScreen('mainMenu');
            $scope.game = null;
            $scope.slot = -1;
            localStorage[$scope.storageName + 'Slot'] = -1;
        };
        
        $scope.newGame = function(slot){
            
            $scope.slot = slot;
            $scope.game = new Game();
        };
        
        $scope.difficultySelected = function(diff){
        
            $scope.game.difficulty = diff;
        };
        
        $scope.save = function(){
            
            $scope.game.screen = $scope.screen;
            
            localStorage[$scope.storageName + 'Slot'] = $scope.slot;
            localStorage[$scope.storageName + 'Game' + $scope.slot] 
                = $scope.game.generateSaveData();
        };
        
        $scope.loadSaves = function(){
            
            $scope.files = [];
            
            for(var i = 0; i < 3; i++){
                var game = localStorage[$scope.storageName + 'Game' + i];
                $scope.files[i] = game ? new Game(game) : null;
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
            var game = new Game(localStorage[prefix + 'Game' + slot]);
            $scope.screen = game.screen;
            $scope.game = game;
        }

        $scope.storageName = $scope.storageName ? $scope.storageName : 'eco';
        $scope.loadFromLocalStorage();

        if($scope.slot == -1)
            $scope.setScreen('mainMenu');
    });    
})();

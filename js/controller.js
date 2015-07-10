(function(){
    
    var eco = angular.module('economania', ['ngAnimate']);

    eco.controller('ecoController', function ($scope) {

        $scope.SCREEN_NAMES = [
            'company',
            'difficultySelect',
            'event',
            'fileSelect',
            'mainMenu',
            'options',
            'planet',
            'ship',
            'travel',
            'market'
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
        
        $scope.difficultySelected = function(diff){
        
            $scope.game.difficulty = diff;
            $scope.setScreen('planet', true);
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
                $scope.files[i] = game ? new Game(game) : new Game();
            };
        };
        
        $scope.fileSelected = function(slot){
            
            $scope.loadSlot(slot);
        };
        
        $scope.loadFromLocalStorage = function(){

            var prefix = $scope.storageName;
            var slot = localStorage[prefix + 'Slot'];

            if(slot && slot != '-1') $scope.slot = parseInt(slot);
            else return $scope.slot = -1;

            $scope.loadSlot($scope.slot);
        };
        
        $scope.loadSlot = function(slot){
            
            var game = $scope.files[slot];
            
            if(!game.initialized)
                game.init();
            
            $scope.slot = slot;
            $scope.screen = game.screen;
            $scope.game = game;
            
            //setup events
            game.on('cashChanged', function(event){
                
                $scope.cashChange = event.change;
                
                $('.cashchange')
                    .stop()
                    .css({top: 0, opacity: 1})
                    .animate({top: '-70%', opacity: 0}, 2000);
            });
        };
        
        $scope.debug = function(p){
            debugger;
        };
        
        $scope.explorePlanet = function(){
            
            $scope.setScreen('event');
        };
        
        $scope.travel = function(index){
                        
            $scope.travelInfo = game.setDestination(index);
        };

        $scope.storageName = $scope.storageName ? $scope.storageName : 'eco';
        $scope.loadSaves();
        $scope.loadFromLocalStorage();

        if($scope.slot == -1)
            $scope.setScreen('mainMenu');
    });    
})();

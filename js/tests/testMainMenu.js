Tests.mainMenuTests = function(){
    
    describe('Game startup tests', function(){
        
        beforeEach(module('economania'));

        it('should default to mainMenu screen if local storage slot is undefined', inject(function($controller) {

            localStorage.removeItem('ecotestSlot');
            
            var scope = {storageName: 'ecotest'},
                ctrl = $controller('ecoController', {$scope:scope});

            expect(scope.screen).toBe('mainMenu');
        }));
        
        it('should default to mainMenu screen if local storage slot is set to -1', inject(function($controller) {

            localStorage.ecotestSlot = -1;
            
            var scope = {storageName: 'ecotest'},
                ctrl = $controller('ecoController', {$scope:scope});

            expect(scope.screen).toBe('mainMenu');
        }));
        
        it('should grab current slot & screen from local storage', inject(function($controller) {
            
            var c = new Game();
            c.screen = 'aaa';
            
            localStorage.ecotestSlot = 0;
            localStorage.ecotestGame0 = c.generateSaveData();
            
            var scope = {storageName: 'ecotest'},
                ctrl = $controller('ecoController', {$scope:scope});            

            expect(scope.slot).toBe(0);
            expect(scope.screen).toBe('aaa');
        }));
        
        it('should make a new game when newGame is called', inject(function($controller) {
            
            var scope = {storageName: 'ecotest'},
                ctrl = $controller('ecoController', {$scope:scope});
            
            scope.slot = 0;
            scope.newGame();  
            
            expect(scope.game).toBeDefined();
        }));
        
        it('should load the company info if initial local storage slot is nonzero', inject(function($controller) {

            localStorage.ecotestSlot = 0;
            localStorage.ecotestScreen0 = 'planet';
            
            var c = new Game();
            c.cash = 10000;
            localStorage.ecotestGame0 = c.generateSaveData();
            
            var scope = {storageName: 'ecotest'},
                ctrl = $controller('ecoController', {$scope:scope});
            
            expect(scope.game).toBeDefined();
            expect(scope.game.company.cash).toBe(10000);
        }));
        
        it('should save to local storage after newGame + difficulty is selected', inject(function($controller) {
            
            var scope = {storageName: 'ecotest'},
                ctrl = $controller('ecoController', {$scope:scope});
            
            scope.newGame(1);
            scope.difficultySelected(2);  
            
            expect(localStorage.ecotestGame1).toBeDefined();
        }));
    }); 
};
Tests.mainMenuTests = function(){
    
    describe('Game startup', function(){
        
        beforeEach(module('economania'));

        it('should default to mainMenu screen if local storage slot is undefined', inject(function($controller) {

            localStorage.removeItem('ecotestSlot');
            
            var scope = {storageName: 'ecotest'},
                ctrl = $controller('ecoController', {$scope:scope});

            expect(scope.screen).toBe('mainMenu');
        }));
        
        it('should default to mainMenu screen if local storage slot is set to -1', inject(function($controller) {

            localStorage.removeItem('ecotestSlot')
            
            var scope = {storageName: 'ecotest'},
                ctrl = $controller('ecoController', {$scope:scope});

            expect(scope.screen).toBe('mainMenu');
        }));
        
        it('should grab current slot & screen from local storage', inject(function($controller) {
            
            var c = new Game();
            c.init();
            c.screen = 'aaa';
            
            localStorage.ecotestSlot = 0;
            localStorage.ecotestGame0 = c.generateSaveData();
            
            var scope = {storageName: 'ecotest'},
                ctrl = $controller('ecoController', {$scope:scope});            

            expect(scope.slot).toBe(0);
            expect(scope.screen).toBe('aaa');
        }));
        
        it('should make a new game when loadSlot is called with nothing in storage', inject(function($controller) {
            
            localStorage.removeItem('ecotestGame0');
            
            var scope = {storageName: 'ecotest'},
                ctrl = $controller('ecoController', {$scope:scope});
            
            scope.loadSlot(0);  
            
            expect(scope.game).toBeDefined();
        }));
        
        it('should load the company info if initial local storage slot is nonzero', inject(function($controller) {

            localStorage.ecotestSlot = 0;
            localStorage.ecotestScreen0 = 'planet';
            
            var g = new Game();
            g.a = 10000;
            localStorage.ecotestGame0 = g.generateSaveData();
            
            var scope = {storageName: 'ecotest'},
                ctrl = $controller('ecoController', {$scope:scope});
            
            expect(scope.game).toBeDefined();
            expect(scope.game.a).toBe(10000);
        }));
        
        it('should save to local storage after init + difficulty is selected', inject(function($controller) {
            
            var scope = {storageName: 'ecotest'},
                ctrl = $controller('ecoController', {$scope:scope});
            
            scope.loadSlot(1);
            scope.difficultySelected(2);  
            
            expect(localStorage.ecotestGame1).toBeDefined();
        }));
    }); 
};
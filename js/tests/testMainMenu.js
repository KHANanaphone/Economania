Tests.mainMenuTests = function(){
    
    describe('Game startup tests', function(){
        
        beforeEach(module('economania'));

        it('should default to mainMenu screen if local storage slot is undefined', inject(function($controller) {

            localStorage.removeItem('ecotestSlot');
            
            var scope = {storageName: 'ecotest'},
                ctrl = $controller('game', {$scope:scope});

            expect(scope.screen).toBe('mainMenu');
        }));
        
        it('should default to mainMenu screen if local storage slot is set to 0', inject(function($controller) {

            localStorage.ecotestSlot = 0;
            
            var scope = {storageName: 'ecotest'},
                ctrl = $controller('game', {$scope:scope});

            expect(scope.screen).toBe('mainMenu');
        }));
        
        it('should grab current slot & screen from local storage', inject(function($controller) {
            
            localStorage.ecotestSlot = 1;
            localStorage.ecotestScreen1 = 'planet';
            
            var scope = {storageName: 'ecotest'},
                ctrl = $controller('game', {$scope:scope});            

            expect(scope.slot).toBe(1);
            expect(scope.screen).toBe('planet');
        }));
        
        it('should make a new company when newGame is called', inject(function($controller) {
            
            var scope = {storageName: 'ecotest'},
                ctrl = $controller('game', {$scope:scope});
            
            scope.slot = 1;
            scope.newGame();  
            
            expect(scope.company).toBeDefined();
        }));
        
        it('should load the company info if initial local storage slot is nonzero', inject(function($controller) {

            localStorage.ecotestSlot = 1;
            localStorage.ecotestScreen1 = 'planet';
            
            var c = new Company();
            c.cash = 10000;
            localStorage.ecotestCompany1 = c.generateSaveData();
            
            var scope = {storageName: 'ecotest'},
                ctrl = $controller('game', {$scope:scope});
            
            expect(scope.company).toBeDefined();
            expect(scope.company.cash).toBe(10000);
        }));
        
        it('should save to local storage after newGame + difficulty is selected', inject(function($controller) {
            
            var scope = {storageName: 'ecotest'},
                ctrl = $controller('game', {$scope:scope});
            
            scope.newGame(1);
            scope.difficultySelected(2);  
            
            expect(localStorage.ecotestCompany1).toBeDefined();
        }));
    }); 
};
Tests.optionsTests = function(){
    
    describe('Options screen tests', function(){
        
        beforeEach(function(){
            module('economania');
            localStorage.optionstestGame0 = '{"reps":{},"ship":{"spaceUsed":0,"size":100},"name":"Company X","cash":10000,"difficulty":1,"screen":"planet","initialized":"true"}';
            localStorage.optionstestSlot = '0';
        });
        
        it('should go back to previous screen when back() is called', 
           inject(function($controller) {
            
            var scope = {storageName: 'optionstest'},
                ctrl = $controller('ecoController', {$scope:scope});
            
            scope.setScreen('planet');
            scope.setScreen('options');
            scope.back();
            expect(scope.screen).toBe('planet');
            
            scope.setScreen('event');
            scope.setScreen('options');
            scope.back();
            expect(scope.screen).toBe('event');
        }));
        
        it('should return to mainMenu with no loaded company when saveAndQuit is called', 
           inject(function($controller) {
            
            var scope = {storageName: 'optionstest'},
                ctrl = $controller('ecoController', {$scope:scope});
            
            scope.setScreen('options');
            scope.saveAndQuit();
            
            expect(scope.screen).toBe('mainMenu');
            expect(scope.game).toBe(null);
            expect(scope.slot).toBe(-1);
        }));
        
        it('should save previous screen when save and quit is called', 
           inject(function($controller) {

            var scope = {storageName: 'optionstest'},
                ctrl = $controller('ecoController', {$scope:scope});
            
            scope.setScreen('options');
            scope.saveAndQuit();
            scope.loadSlot(0);
            expect(scope.screen).toBe('planet');
        }));
        
        it('slot in localstorage should be cleared when save and quit is called', 
           inject(function($controller) {
            
            var scope = {storageName: 'optionstest'},
                ctrl = $controller('ecoController', {$scope:scope});
            
            scope.setScreen('options');
            scope.saveAndQuit();
            
            expect(localStorage.optionstestSlot).toBe('-1');
        }));
    });
};
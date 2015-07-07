Tests.exploreTests = function(){
    
    describe('Explore planet', function(){
        
        beforeEach(module('economania'));

        it('should set the screen to "event"', inject(function($controller) {

            var scope = {storageName: 'ecotest'},
                ctrl = $controller('ecoController', {$scope:scope});

            scope.explorePlanet();
            
            expect(scope.screen).toBe('event');
        }));
    });
};
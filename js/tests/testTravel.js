Tests.travelTests = function(){
    
    describe('game.setDestination function', function(){
        
        it('should return an object with the travel info', inject(function($controller) {
                   
            var g = new Game();      
            g.init();
            
            var dest = g.setDestination(0);
            
            expect(dest.index).toBe(0);
            expect(dest.distance).toBe(g.planet.destinations[0].distance);
            expect(dest.distanceTraveled).toBe(0);
        }));
    });
};
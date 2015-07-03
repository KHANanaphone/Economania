Tests.planetTests = function(){
    
    describe('A half-generated planet', function(){
        
        it('should have a name', inject(function($controller) {
            
            var g = new Game();     
            g.newGame();
            var p = Planet.halfGenerate(g);
            
            expect(typeof p.name).toBe('string');
        }));
        
        it('should have an integer rating between 0 and 100', inject(function($controller) {
            
            var g = new Game();          
            g.newGame();      
            var p = Planet.halfGenerate(g);
            
            expect(p.economyRating).toBeGreaterThan(-1);
            expect(p.economyRating).toBeLessThan(101);
            expect(p.economyRating % 1).toBe(0);
        }));
        
        it('should have a special', inject(function($controller) {
            
            var g = new Game();    
            g.newGame();            
            var p = Planet.halfGenerate(g);

            expect(typeof p.special).toBe('string');
        }));
    });    
    
    describe('A full-generated planet', function(){
        
        it('should have a name', inject(function($controller) {
                   
            var g = new Game();      
            g.newGame();
            var hp = Planet.halfGenerate(g);
            var p = Planet.fullGenerate(g, hp);
            
            expect(typeof p.name).toBe('string');
        }));
        
        it('should have list of commodities', inject(function($controller) {
            
            var g = new Game();       
            g.newGame();   
            var hp = Planet.halfGenerate(g);      
            var p = Planet.fullGenerate(g, hp);
            
            expect(typeof p.commodities).toBe('object');
            expect(Object.keys(p.commodities).length).toBe(g.commodities.length);        
        })); 
        
        it('should have a special', inject(function($controller) {
            
            var g = new Game();       
            g.newGame();   
            var hp = Planet.halfGenerate(g);      
            var p = Planet.fullGenerate(g, hp);
            
            expect(typeof p.special).toBe('string');  
        })); 
        
        it('should have three destinations', inject(function($controller) {
            
            var g = new Game();       
            g.newGame();   
            var hp = Planet.halfGenerate(g);      
            var p = Planet.fullGenerate(g, hp);
            
            expect(p.destinations.length).toBe(3);  
        })); 
    });
};
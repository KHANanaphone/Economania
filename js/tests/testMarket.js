Tests.marketTests = function(){
    
    describe('commsOnPlanetOrShip filter', function(){
        
        var $filter;
        
        beforeEach(function(){
            module('economania');
            
            inject(function($injector){
               $filter = $injector.get('$filter')('commsOnPlanetOrShip'); 
            });      
        });
        
        it('should show only commodities that are either on the planet or on the ship', inject(function($controller) {
                
            var fakeScope = {game: {
                ship: {
                    commodities: {
                        'A': {count: 1},
                        'B': {count: 1},
                        'C': {count: 0},
                        'D': {count: 0}
                    }
                }
            }};
            
            var fakeItems = {
                'A': {count: 1},
                'B': {count: 0},
                'C': {count: 1},
                'D': {count: 0}
            };
            
            var filtered = $filter(fakeItems, fakeScope);
            
            expect(filtered.A).toBeDefined();            
            expect(filtered.B).toBeDefined();            
            expect(filtered.C).toBeDefined();            
            expect(filtered.D).toBeUndefined();
        }));
    });
    
    describe('Buying a commodity', function(){
        
        it("Should lower the company's cash accordingly", inject(function($controller) {
            
            var g = new Game();
            g.init();
            g.company.cash = 5000;            
            g.planet.commodities[0] = {
                count: 10,
                price: 30
            };
            
            var bought = g.buyCommodity(0);
            
            expect(bought).toBe(10);
            expect(g.company.cash).toBe(4700);
        }));      
                
        it("Should set the commodities object value on the ship if unset", inject(function($controller) {
            
            var g = new Game();
            g.init();
            g.company.cash = 5000;            
            g.planet.commodities[0] = {
                name: 'aaa',
                count: 10,
                price: 10
            };
            
            expect(g.ship.commodities['aaa']).toBeUndefined();
            
            g.buyCommodity(0);            
            expect(g.ship.commodities['aaa']).toBeDefined();
            expect(g.ship.commodities['aaa'].count).toBe(10);
            expect(g.ship.commodities['aaa'].spent).toBe(100);
            expect(g.ship.commodities['aaa'].average).toBe(10);
        }));          
        
        it("Should add to the commodities object value on the ship if set", inject(function($controller) {
            
            var g = new Game();
            g.init();
            g.company.cash = 5000;            
            g.planet.commodities[0] = {
                name: 'aaa',
                count: 10,
                price: 10
            };
            
            g.ship.commodities['aaa'] = {count: 10, spent: 50, average: 5};
            
            g.buyCommodity(0);        
            expect(g.ship.commodities['aaa'].count).toBe(20);
            expect(g.ship.commodities['aaa'].spent).toBe(150);
            expect(g.ship.commodities['aaa'].average).toBe(7.5);
        }));  
        
        it("Should increase the ship's used space", inject(function($controller) {
            
            var g = new Game();
            g.init();
            g.company.cash = 5000;            
            g.planet.commodities[0] = {
                count: 10,
                price: 30
            };
            
            var left = g.ship.size - g.ship.spaceUsed;
            var bought = g.buyCommodity(0);
            
            expect(bought).toBe(10);
            expect(g.ship.size - g.ship.spaceUsed).toBe(left - 10);
        }));    
        
        it("Should only buy as many as can fit on the ship", inject(function($controller) {
            
            var g = new Game();
            g.init();
            g.company.cash = 5000;            
            g.planet.commodities[0] = {
                count: 1000,
                price: 1
            };
            
            var left = g.ship.size - g.ship.spaceUsed;
            var bought = g.buyCommodity(0);
            
            expect(bought).toBe(left);
            expect(g.ship.size - g.ship.spaceUsed).toBe(0);
        }));          
        
        it("Should lower the amount on the planet", inject(function($controller) {
            
            var g = new Game();
            g.init();
            g.company.cash = 5000;            
            g.planet.commodities[0] = {
                count: 10,
                price: 30
            };
            
            var bought = g.buyCommodity(0);            
            expect(g.planet.commodities[0].count).toBe(0);
        }));
    });
    
    describe('Selling a commodity', function(){
        
        it("Should increase the company's cash accordingly", inject(function($controller) {
            
            var g = new Game();
            g.init();
            g.company.cash = 5000;            
            g.planet.commodities[0] = {
                name: 'AAA',
                count: 0,
                price: 100
            };
            
            Ship.addCommodity(g.ship, g.planet.commodities[0], 20);
            
            var sold = g.sellCommodity(0);
            
            expect(sold).toBe(20);
            expect(g.company.cash).toBe(7000);
        }));      
                
        it("Should set the commodity's count and average to 0", inject(function($controller) {
                        
            var g = new Game();
            g.init();
            g.company.cash = 5000;            
            g.planet.commodities[0] = {
                name: 'AAA',
                count: 0,
                price: 100
            };
            
            Ship.addCommodity(g.ship, g.planet.commodities[0], 20);
            
            g.sellCommodity(0);
            
            expect(g.ship.commodities['AAA'].count).toBe(0);
            expect(g.ship.commodities['AAA'].average).toBe(0);
        }));     
        
        it("Should decrease the ship's used space", inject(function($controller) {
            
            var g = new Game();
            g.init();
            g.company.cash = 5000;            
            g.planet.commodities[0] = {
                name: 'AAA',
                count: 0,
                price: 100
            };
            
            Ship.addCommodity(g.ship, g.planet.commodities[0], 20);
            
            var used = g.ship.spaceUsed;
            g.sellCommodity(0);
            
            expect(g.ship.spaceUsed).toBe(used - 20);
        }));           
        
        it("Should increase the amount on the planet", inject(function($controller) {
            
            var g = new Game();
            g.init();
            g.company.cash = 5000;            
            g.planet.commodities[0] = {
                name: 'AAA',
                count: 0,
                price: 100
            };
            
            Ship.addCommodity(g.ship, g.planet.commodities[0], 20);
            
            var used = g.ship.spaceUsed;
            g.sellCommodity(0);
            
            expect(g.planet.commodities[0].count).toBe(20);
        }));
    });
};
    
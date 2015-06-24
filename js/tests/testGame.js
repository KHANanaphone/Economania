Tests.gameTests = function(){
    
    describe('Converting from Game to string back to Game', function(){
        
        it('should convert to a string', inject(function($controller) {
            
            var c = new Game();
            var data = c.generateSaveData();
            
            expect(typeof data).toBe('string');
        }));        
        
        it('should convert back to a company object', inject(function($controller) {
            
            var c = new Game();
            var data = c.generateSaveData();        
            var c2 = new Game(data);
            
            expect(c2 instanceof Game).toBeTruthy();
        }));
                
        it('should convert custom properties', inject(function($controller) {
                        
            var c = new Game();
            c.prop1 = 'aaa';
            c.prop2 = null;
            c.prop3 = 500;
            
            var c2 = new Game(c.generateSaveData());
            
            expect(c2.prop1).toBe('aaa');
            expect(c2.prop2).toBe(null);
            expect(c2.prop3).toBe(500);
        }));
        
        it('should convert arrays', inject(function($controller) {
                        
            var c = new Game();
            c.array = ['aaa', null, 500];
            
            var c2 = new Game(c.generateSaveData());
        
            expect(c2.array instanceof Array).toBeTruthy();
            expect(c2.array[0]).toBe('aaa');
            expect(c2.array[1]).toBe(null);
            expect(c2.array[2]).toBe(500);
        }));        
        
        it('should convert objects', inject(function($controller) {
                        
            var c = new Game();
            c.object = {a: 'aaa', b: null, c: 500};
            
            var c2 = new Game(c.generateSaveData());
        
            expect(c2.object instanceof Object).toBeTruthy();
            expect(c2.object.a).toBe('aaa');
            expect(c2.object.b).toBe(null);
            expect(c2.object.c).toBe(500);
        }));        
        
        it('should convert nested arrays & objects', inject(function($controller) {
                        
            var c = new Game();
            c.array = [{a: 0, b: 1, c: 2}, [3, 4, {d: 5, e: 6, f: [7, 8]}]];
            c.object = {g: [[[[[9, 10], 11], 12], 13], 14], h: 15};
            
            var c2 = new Game(c.generateSaveData());
            
            expect(c2.array[0].a).toBe(0);
            expect(c2.array[0].b).toBe(1);
            expect(c2.array[0].c).toBe(2);
            expect(c2.array[1][0]).toBe(3);  
            expect(c2.array[1][1]).toBe(4);
            expect(c2.array[1][2].d).toBe(5);
            expect(c2.array[1][2].e).toBe(6);  
            expect(c2.array[1][2].f[0]).toBe(7);
            expect(c2.array[1][2].f[1]).toBe(8);
            expect(c2.object.g[0][0][0][0][0]).toBe(9);  
            expect(c2.object.g[0][0][0][0][1]).toBe(10);
            expect(c2.object.g[0][0][0][1]).toBe(11);
            expect(c2.object.g[0][0][1]).toBe(12);  
            expect(c2.object.g[0][1]).toBe(13);
            expect(c2.object.g[1]).toBe(14);
            expect(c2.object.h).toBe(15);            
        }));
    });    
};
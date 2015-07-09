Tests.fileSelectTests = function(){
    
    describe('File select screen tests', function(){
        
        beforeEach(module('economania'));
        
        it('should load file info when "loadSaves" is called', inject(function($controller) {

            localStorage.ecotestSlot = -1;
            localStorage.ecotestGame0 = new Game({name: 'Bbbb'}).generateSaveData();
            localStorage.removeItem('ecotestGame1');
            localStorage.ecotestGame2 = new Game({name: 'Aaaa'}).generateSaveData();
            
            var scope = {storageName: 'ecotest'},
                ctrl = $controller('ecoController', {$scope:scope});
        
            expect(scope.files[0].name).toBe('Bbbb');
            expect(scope.files[1].initialized).toBe(false);
            expect(scope.files[2].name).toBe('Aaaa');
        }));
        
        it('should load file info into Game when "fileSelected" is called', inject(function($controller) {

            localStorage.ecotestGame1 = new Game({name: 'Aaaa'}).generateSaveData();
            
            var scope = {storageName: 'ecotest'},
                ctrl = $controller('ecoController', {$scope:scope});

            scope.fileSelected(1);
            
            expect(scope.game).toBeDefined();
            expect(scope.game.name).toBe('Aaaa');
        }));
    });
             
};
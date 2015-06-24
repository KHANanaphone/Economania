Tests.fileSelectTests = function(){
    
    describe('File select screen tests', function(){
        
        beforeEach(module('economania'));
        
        it('should load file info when "loadSaves" is called', inject(function($controller) {

            localStorage.ecotestCompany0 = new Company({name: 'Bbbb'}).generateSaveData();
            localStorage.removeItem('ecotestCompany1');
            localStorage.ecotestCompany2 = new Company({name: 'Aaaa'}).generateSaveData();
            
            var scope = {storageName: 'ecotest'},
                ctrl = $controller('game', {$scope:scope});

            scope.loadSaves();
            
            expect(scope.files[0].name).toBe('Bbbb');
            expect(scope.files[1]).toBe(null);
            expect(scope.files[2].name).toBe('Aaaa');
        }));
        
        it('should load file info into company when "fileSelected" is called', inject(function($controller) {

            localStorage.ecotestCompany1 = new Company({name: 'Aaaa'}).generateSaveData();
            
            var scope = {storageName: 'ecotest'},
                ctrl = $controller('game', {$scope:scope});

            scope.fileSelected(1);
            
            expect(scope.company).toBeDefined();
            expect(scope.company.name).toBe('Aaaa');
        }));
    });
             
};
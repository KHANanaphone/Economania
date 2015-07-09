(function(){
    
    var eco = angular.module('economania');

    eco.filter('commsOnPlanetOrShip', function(){

        return function(items, scope){
            
            if(!items)
                return null;
            
            var filtered = {};
            
            for(var key in items){
                
                var item = items[key];
                
                if(item.count > 0 || scope.game.ship.commodities[key].count > 0)
                    filtered[key] = item;
            };
            
            return filtered;
        };    
    });
    
    eco.filter('orderObjectBy', function(){
        return function(input, attribute) {
            if (!angular.isObject(input)) return input;

            var array = [];
            for(var objectKey in input) {
                array.push(input[objectKey]);
            }

            array.sort(function(a, b){
                a = parseInt(a[attribute]);
                b = parseInt(b[attribute]);
                return a - b;
            });
            return array;
        }
    });
    
    eco.filter('toRelativePct', function(){

        return function(ratio){
            
            var n = Math.round(ratio * 100);
            
            if(n > 0)
                return '+' + n + '%';
            else
                return n + '%';
        };
    });
    
    eco.filter('abs', function(){
        
        return function(number){
            
            return Math.abs(number);
        };
    });
})();
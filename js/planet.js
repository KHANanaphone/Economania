var Planet = {
    names: Game.shuffleArray(PLANET_NAMES),
    specials: Game.shuffleArray(SPECIAL_NAMES)
};

Planet.fullGenerate = function(game, planetData){
        
    var planet = {
        name: planetData.name,
        commodities: generateComms(game, planetData.economyRating),
        special: planetData.special,
        destinations: generateDestinations(game)
    };    
    
    return planet;
    
    function generateDestinations(game){
        
        var dests = [];
        
        dests.push(Planet.halfGenerate(game));
        dests.push(Planet.halfGenerate(game));
        dests.push(Planet.halfGenerate(game));
        
        return dests;
    };
    
    function generateComms(game, rating){
        
        var planComms = [];
        var comms = Game.shuffleArray(game.commodities);
        var valuesArray = createValuesArray(game, planetData.economyRating);
        var i = 0;
        var priceFactor = (150 - planetData.economyRating) / 100;

        for(var i = 0; i < comms.length; i++){
            
            var val = valuesArray[i] ? valuesArray[i] : 0;
            var mult = i < val.length ? i : val.length;
            var comm = comms[i];
            var count = Math.ceil(val / comm.average);
            var price = Math.ceil(priceFactor * comm.average * (0.6 + mult * 0.2));

            planComms.push({
                name: comm.name, 
                count: count, 
                price: price,
                average: comm.average
            });
        };
        
        return planComms;
    };    
    
    function createValuesArray(game, rating){
        
        var array = [];
        var totalValue = rating * game.commodityFactor;
        
        if(totalValue < 25)
            array.push(totalValue);
        else if(totalValue < 50)
            array.push(totalValue * 2 / 3, totalValue / 3);
        else if(totalValue < 75)
            array.push(totalValue / 2, totalValue / 3, totalValue / 6);
        else
            array.push(
                totalValue * 0.4, totalValue * 0.3, totalValue * 0.2, totalValue * 0.1);
        
        return array;
    };
};

Planet.halfGenerate = function(game){
    
    var planet = {
        name: getRandomName(),
        economyRating: Math.floor(Math.random() * 101),
        special: getRandomSpecial()
    };
    
    return planet;
    
    function getRandomName(){
        
        if(Planet.names.length == 0)
            Planet.names = Game.shuffleArray(PLANET_NAMES);
        
        return Planet.names.pop();
    };
    
    function getRandomSpecial(){
        
        if(Planet.specials.length == 0)
            Planet.specials = Game.shuffleArray(SPECIAL_NAMES);
        
        return Planet.specials.pop();
    };
};
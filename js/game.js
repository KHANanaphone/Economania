function Game(vars){
    
    if(typeof vars === "string")
        vars = JSON.parse(vars);
    
    for(var i in vars)        
        this[i] = vars[i];    
    
    this.commodityFactor = 50;
};

Game.shuffleArray = function(a, count){
    
    if(!count)
        count = a.length;
    
    var copy = a.slice();
    var shuffled = [];
    
    for(var i = 0; i < count; i++)
        shuffled.push(copy.splice(Math.random() * copy.length, 1)[0]);
    
    return shuffled;
};

Game.prototype.newGame = function(){
    
    this.reputations = {};    
    this.commodities = this.generateCommodities(8);
    
    this.ship = {
        spaceUsed: 0,                 
        size: 100
    };
    
    this.company = {
        name: 'Company X',
        cash: 10000
    };
    
    this.planet = Planet.fullGenerate(this, Planet.halfGenerate(this));
};

Game.prototype.generateCommodities = function(count){
    
    var shuffled = Game.shuffleArray(COMMODITY_NAMES, count);
    var comms = [];
    
    for(var i = 0; i < count; i++)
        comms.push({name: shuffled[i], average: (i + 1) * 20});
    
    return comms;
};

Game.prototype.generateSaveData = function(){
    
    return JSON.stringify(this);
};
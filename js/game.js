function Game(vars){
    
    if(typeof vars === "string")
        vars = JSON.parse(vars);
    
    for(var i in vars)        
        this[i] = vars[i];    
    
    this.commodityFactor = 100;
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
    
    this.ship = Ship.create(100, this.commodities);
    
    this.company = {
        name: 'Company X',
        cash: 5000
    };
    
    this.planet = Planet.fullGenerate(this, Planet.halfGenerate(this, {economyRating: 80}));
};

Game.prototype.generateCommodities = function(count){
    
    var shuffled = Game.shuffleArray(COMMODITY_NAMES, count);
    var comms = [];
    
    for(var i = 0; i < count; i++)
        comms.push({name: shuffled[i], average: (i + 1) * 30});
    
    return comms;
};

Game.prototype.generateSaveData = function(){
    
    return JSON.stringify(this);
};

Game.prototype.buyCommodity = function(name){

    var planComm = this.planet.commodities[name];
    
    if(!planComm)
        return 0;
    
    var space = this.ship.size - this.ship.spaceUsed;
    var moneyFor = Math.floor(this.company.cash / planComm.price);
    
    var toBuy = moneyFor < space ? moneyFor : space;
    toBuy = toBuy < planComm.count ? toBuy: planComm.count;
    
    Ship.addCommodity(this.ship, planComm, toBuy);
    this.company.cash -= toBuy * planComm.price;
    planComm.count -= toBuy;    
    return toBuy;
};

Game.prototype.sellCommodity = function(name){
    
    var planComm = this.planet.commodities[name];
    
    if(!planComm)
        return 0;
    
    var shipComm = this.ship.commodities[planComm.name];
    var toSell = shipComm.count;
    
    Ship.removeCommodity(this.ship, planComm.name);
    this.company.cash += toSell * planComm.price;
    planComm.count += toSell;
    return toSell;
};
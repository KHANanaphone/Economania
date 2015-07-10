function Game(vars){
    
    if(typeof vars === "string")
        vars = JSON.parse(vars);
    
    this.initialized = false;
    
    for(var i in vars)        
        this[i] = vars[i]; 
    
    this.events = {};
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

Game.prototype.init = function(){
    
    this.initialized = true;
    this.reputations = {};    
    this.commodities = this.generateCommodities(8);
    this.commodityFactor = 100;    
    this.ship = Ship.create(100, this.commodities);
    
    this.company = {
        name: 'Company X',
        cash: 5000
    };
    
    this.date = {
        week: 1,
        day: 1,
        timeString: '00:00',
        time: 0
    }
    
    this.planet = Planet.fullGenerate(this, Planet.halfGenerate(this, {economyRating: 80}));
    this.screen = 'difficultySelect';
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
    var toBuy = space < planComm.count ? space: planComm.count;
    
    Ship.addCommodity(this.ship, planComm, toBuy);
    this.changeCash(-1 * toBuy * planComm.price);
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
    this.changeCash(toSell * planComm.price);
    planComm.count += toSell;
    return toSell;
};

Game.prototype.changeCash = function(amount){
  
    var e = {
        old: this.company.cash,
        new: this.company.cash + amount,
        change: amount
    };
    
    this.company.cash += amount;
    
    if(this.events['cashChanged'])
        this.events['cashChanged'](e);
};

Game.prototype.on = function(eventName, callback){
    
    this.events[eventName] = callback;
};

Game.prototype.setDestination = function(index){
    
};
function Game(vars){
    
    if(typeof vars === "string")
        vars = JSON.parse(vars);
    
    this.reputations = {};
    
    this.ship = {
        spaceUsed: 0,                 
        size: 100
    };
    
    this.company = {
        name: 'Company X',
        cash: 10000
    };
    
    for(var i in vars)        
        this[i] = vars[i];    
};

Game.prototype.generateSaveData = function(){
    
    return JSON.stringify(this);
};
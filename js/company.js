function Company(vars){
    
    if(typeof vars === "string")
        vars = JSON.parse(vars);
    
    this.reps = {};
    this.name = "Company X";
    this.cash = 10000;
    
    for(var i in vars)        
        this[i] = vars[i];    
};

Company.prototype.generateSaveData = function(){
    
    return JSON.stringify(this);
};
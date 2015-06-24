function Company(){
    
    this.cash = 0;
    this.reps = {};
};

Company.prototype.generateSaveData = function(){
    
    return JSON.stringify(this);
};

Company.createFromSavedData = function(dataString){
    
    if(!dataString)
        return null;
    
    var obj = JSON.parse(dataString);    
    var c = new Company();
    
    for(var i in obj){
        
        var item = obj[i];        
        c[i] = item;
    };
    
    return c;
};
var Tests = {};

Tests.run = function(){
    
    for(var i in Tests){
        
        if(i == 'run')
            continue;
        
        var test = Tests[i];
        
        if(typeof test === 'function')
            test();
    }
};
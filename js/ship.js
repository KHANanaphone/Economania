var Ship = {};

Ship.create = function(size, comms){
    
    var ship = {
        spaceUsed: 0,
        size: 100,
        commodities: {}
    };
    
    Ship.setCrewSize(ship, 6);
    
    for(var i = 0; i < comms.length; i++){
        
        var comm = comms[i];
        Ship.addCommodity(ship, comm, 0);
    };
    
    return ship;
};

Ship.setCrewSize = function(ship, size){
    
    var prevSize = ship['crew'] ? ship['crew'] : 0;
    ship['crew'] = size;
    ship.spaceUsed += (size - prevSize);
};

Ship.addCommodity = function(ship, comm, count){
    
    var shipComm = ship.commodities[comm.name];
    
    if(shipComm){
        shipComm.count += count;
        shipComm.spent += comm.price * count;
        shipComm.average = Math.round(100 * shipComm.spent / shipComm.count) / 100;
    }
    else{
        ship.commodities[comm.name] = {
            name: comm.name,
            count: count,
            spent: comm.price * count,
            average: comm.price
        };
    };
    
    ship.spaceUsed += count;
};

Ship.removeCommodity = function(ship, commName, count){
    
    var shipComm = ship.commodities[commName];
    
    if(!shipComm)
        return;
    if(!count)
        count = shipComm.count;
    
    shipComm.count -= count;
    shipComm.spent -= count * shipComm.average;
    
    if(shipComm.count == 0)
        shipComm.average = 0;
    else
        shipComm.average = Math.round(100 * shipComm.spent / shipComm.count) / 100;
    
    ship.spaceUsed -= count;
};
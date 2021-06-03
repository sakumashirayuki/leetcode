var minSpeedOnTime = function(dist, hour) {
    let time = Number.MAX_SAFE_INTEGER;
    let speed = 1;
    if(hour < dist.length - 1)
        return -1;
    while(time > hour){
        time = 0;
        dist.forEach((distance, index)=>{
            if(index < dist.length - 1){
                if(distance < speed)
                    time++;
                else
                    time += Math.ceil(distance / speed);    
            }else{
                time += distance / speed;  
            }
        })
        speed++;
    }
    return speed - 1; // under what circumtances will not find the speed
};
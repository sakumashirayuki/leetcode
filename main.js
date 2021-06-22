var maxPoints = function(points) {
    const n = points.length;
    let ans = 1;
    for(let i = 0; i < n; i++){
        const point1 = points[i];
        const hashmap = new Map();
        let count = 1;
        let duplicates = 0;
        for(let j = i + 1 ; j < n; j++){
            const point2 = points[j];
            if(point1[0]==point2[0] && point1[1]==point2[1]) // if i is the same with j
                duplicates++;
            if(point1[0]==point2[0]){ // [x]
                if(!hashmap.has(`${point1[0]}`)){ // not exist
                    hashmap.set(`${point1[0]}`, 2);
                    count = Math.max(count, 2);
                }else{ // already has
                    const prevCount = hashmap.get(`${point1[0]}`);
                    hashmap.set(`${point1[0]}`, prevCount + 1);
                    count = Math.max(count, prevCount + 1);
                }
            }else{// x1: point1[0], y1: point1[1], x2: point2[0], y2: point2[1]
                const k = (point2[1] - point1[1]) / (point2[0] - point1[0]);
                const b = point2[1] - k * point2[0];
                if(!hashmap.has(`${k},${b}`)){
                    hashmap.set(`${k},${b}`, 2);
                    count = Math.max(count, 2);
                }else{
                    const prevCount = hashmap.get(`${k},${b}`);
                    hashmap.set(`${k},${b}`, prevCount + 1);
                    count = Math.max(count, prevCount + 1);
                }
            }
        }
        console.log(hashmap);
        count += duplicates;
        ans = Math.max(ans, count);
    }
    return ans;
};
<<<<<<< HEAD
const binarySearch = function(packages, left, right, target){
    if(left > right)
        return left - 1; // if the box is smaller than all packages, return -1
    let middle = left + ((right - left) >> 1);
    console.log("left: ", left);
    console.log("right: ", right);
    console.log("middle: ", middle);
    console.log("middle value: ", packages[middle]);
    if(packages[middle] <= target){
        return binarySearch(packages, middle + 1, right, target);
    }else{
        return binarySearch(packages, left, middle - 1, target);
    }
}
const packages = [341,170,320,161,340,64,369,154,260,159,342,210,168,207,357,152,284,66,99,216,341,195,347,384,90,316,292,155,208,281,1,156,147,108,221,297,311,336,165,239,227,227,346,110,262,243,377,87,338,44,146,264,340,325,318,172,48,385,121,345,159,116,102,76,13,24,126,244,313,394,38,234,213,323,295,100,368,357,197,254,205,125,76,336,353,3,385,395,55,399,218,113,91,357,266,238,26,286,128,63];
packages.sort((a, b) => a - b);
const n = packages.length;
console.log(binarySearch(packages, 0, n - 1, 385));
=======
var maxPoints = function(points) {
    const maxInt = 0xffffff;
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
                const k = ((point2[1] - point1[1]) % maxInt * maxInt) / (point2[0] - point1[0]);
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
>>>>>>> d038ffe68ee5dc288715084e1d632cb1cfb20c48

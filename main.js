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
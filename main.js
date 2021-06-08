/**
 * @param {number[]} packages
 * @param {number[][]} boxes
 * @return {number}
 */
 var minWastedSpace = function(packages, boxes) {
    const binarySearch = function(packages, left, right, target){
        if(left > right)
            return left - 1; // if the box is smaller than all packages, return -1
        let middle = left + ((right - left) >> 1);
        if(packages[middle]==target)
            return middle;
        if(packages[middle] < target){
            return binarySearch(packages, middle + 1, right, target);
        }else{
            return binarySearch(packages, left, middle - 1, target);
        }
    }
    packages.sort((a,b) => a - b);
    const sponseNumber = boxes.length;
    const packageNumber = packages.length;
    let result = BigInt(Number.MAX_SAFE_INTEGER);
    // prefix sum
    const prefixSum = new Array(packageNumber + 1).fill(0);
    for(let i = 1; i <= packageNumber; i++){ // from 1 to packageNumber
        prefixSum[i] = prefixSum[i - 1] + packages[i];
    }
    for(let i = 0; i < sponseNumber; i++){
        const boxArray = boxes[i].sort((a, b) => a - b); // sorted
        if(boxArray[boxArray.length - 1] < packages[packageNumber - 1]) // the last box cannot contain the first package
            continue;
        let wasteSum = 0n;
        let packageP = 0;
        for(let j = 0; j < boxArray.length; j++){ // for each box
            if(packageP == packageNumber) // all packages have been placed into box
                break;
            if(packages[packageP] > boxArray[j]) // continue to the next box
                continue;
            let packInd = binarySearch(packages, packageP, packageNumber, boxArray[j]);
            console.log(prefixSum[packInd + 1] - prefixSum[packageP]);
            wasteSum += BigInt(boxArray[j] * (packInd - packageP + 1)) - BigInt(prefixSum[packInd + 1] - prefixSum[packageP])
            // for(let k = packageP; k <= packInd; k++){
            //     wasteSum += BigInt(boxArray[j]) - BigInt(packages[k]);
            // }
            packageP = packInd + 1;
        }
        // get the min wasteSum
        if(wasteSum < result)
            result = wasteSum;
    }
    return result == BigInt(Number.MAX_SAFE_INTEGER) ? -1 : result % (BigInt(1e9 + 7));
};
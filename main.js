var minSwaps = function(s) {
    const sArray = s.split("");
    const n = sArray.length;
    let result;
    const swap = function(n, prev, sArray){ // prev is '0' or '1'
        let left=0;
        let swapCount = 0;
        while(left < n){
            let current = prev=='1' ? '0' : '1';
            if(sArray[left]!=current){
                let right = left + 1;
                while(sArray[right]!=current){
                    right += 2;
                }
                [sArray[left], sArray[right]] = [sArray[right], sArray[left]];
                swapCount++;
            }
            prev = sArray[left];
            left++;
        }
        return swapCount;
    }
    // analyse the numbers of 0 and 1
    let countOne = 0;
    let countZero = 0;
    for(const snum of sArray){
        if(snum=='0')
            countZero++;
        else
            countOne++;
    }
    if((n%2==1)&&((countZero==(n>>1))||(countOne==(n>>1)))){
        if(countZero==(n>>1)){ // one be the first
            result = swap(n, '0', [...sArray]);
        }else{
            result = swap(n, '1', [...sArray]);
        }    
    }else if(n%2==0&&countZero==(n>>1)){
        result = Math.min(swap(n, '0', [...sArray]), swap(n, '1', [...sArray]));
    }else{
        return -1;
    }
    return result;
};
console.log(minSwaps("01"));
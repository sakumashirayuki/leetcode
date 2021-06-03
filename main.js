var search = function(nums, target) {
    const n = nums.length;
    let left = 0, right = n -1;
    while(left < right){
        let middle = left + ((right - left) >> 1);
        if(nums[middle]===target)
            return middle;
        if(nums[0] < nums[middle]){ // the left part is in order
            if(nums[middle] < target){
                left = middle + 1;
            }else{
                right = middle;
            }
        }else if(nums[middle] < nums[n - 1]){// the right part is in order
            if()
        }
    }
};
var recoverTree = function(root) {
    const stack = [];
    let temp = root;
    let prev = null;
    let curr;
    const disorder = [];
    while(temp != null || stack.length){
        while(temp){
            stack.push(temp)
            temp = temp.left;
        }
        // console.log(stack);
        if(stack.length){
            temp = stack.pop();
            // console.log(temp.val);
            curr = temp;
            if(prev!=null){
                if(curr.val < prev.val){
                    disorder.push(curr);
                }
            }
            prev = curr;
            temp = temp.right;
        }
    }
    console.log(disorder);
    const firstNode= disorder[0];
    const secondNode = disorder[disorder.length - 1];
    const firstValue = firstNode.val;
    const secondValue = secondNode.val;
    firstNode.val = secondValue;
    secondNode.val = firstValue;
};
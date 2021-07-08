 var calculate = function(s) {
    const operatorStack = [];
    const operandStack = [];
    let ans = 0, sign = 1;
    let i = 0;
    const n = s.length;
    while(i < n){
        const char = s[i];
        if(char.match(/[0-9]/)){
            let value = 0;
            while(i < n && !isNaN(Number(s[i])) && s[i] != ' '){
                value = value * 10 + parseInt(s[i]);
                i++;
            }
            // calculate
            ans += sign * value;
        }else if(char=='+'){
            sign = 1;
            i++;
        }else if(char=='-'){
            sign = -1;
            i++;
        }else if(char=='('){
            operatorStack.push(ans);
            ans = 0;
            operandStack.push(sign);
            sign = 1;
            i++;
        }else if(char==')'){
            const outer = operandStack.pop();
            const currentSign = operatorStack.pop();
            ans = outer + currentSign * ans;
            i++;
        }else{ // blank
            i++;
        }
        console.log("char: ", char);
        console.log("operator: ", operatorStack);
        console.log("operand: ", operandStack);
        console.log("ans: ", ans);
        console.log("sign: ", sign);
    }
    return ans;
};
const s = "(1+(4+5+2)-3)+(6+8)";
console.log(calculate(s));
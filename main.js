var permutation = function(s) {
    const letterArray = s.split("");
    letterArray.sort((a, b)=> a.charCodeAt() - b.charCodeAt()); // sort it
    console.log(letterArray);
    const n = letterArray.length;
    const vis = new Array(n).fill(false);
    const arrayResult = [];
    const dfs = function(path){
        // end point
        if(path.length==n){
            arrayResult.push([...path]);
            return;
        }
        for(let i = 0 ; i < n; i++){
            if(i > 0 && letterArray[i]==letterArray[i - 1] && vis[i-1]==false) // duplicate letters must be accessed by orders
                continue;
            if(!vis[i]){ // have not been used
                path.push(letterArray[i]);
                vis[i] = true;
                dfs(path);
                // back trace
                path.pop();
                vis[i] = false;
            }
        }
    }
    const path = [];
    dfs(path);
    const result = arrayResult.map((ele)=>ele.join(""));
    // // remove duplicate
    // const hshmap = new Map();
    // for(const str of result){

    // }
    return result;
};
console.log(permutation("suvyls"));
/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var movingCount = function(m, n, k) {
    let cnt = 0;
    const vis = new Array(m).fill(null).map(row => new Array(n).fill(false));
    const digitSum = (x, y) => {
        let sum = 0;
        while(x){
            sum += x % 10;
            x = Math.floor(x / 10);
        }
        while(y){
            sum += y % 10;
            y = Math.floor(y / 10);
        }
        return sum;
    }
    const dfs = (x, y) => {
        if(x < 0 || x >= m || y < 0 || y >= n  || vis[x][y])
            return;
        const sum = digitSum(x, y);
        // console.log(x, y, sum, sum > k);
        if(sum > k){
            // console.log(x, y, sum, sum > k);
            vis[x][y] = true;
            return;
        }
        cnt++;
        vis[x][y] = true;
        dfs(x - 1, y);
        dfs(x + 1, y);
        dfs(x, y - 1);
        dfs(x, y + 1);
    }
    for(let i = 0; i < m; i++){
        for(let j = 0; j < n; j++){
            if(!vis[i][j])
                dfs(i, j);
        }
    }
    return cnt;
};
console.log(movingCount(50, 50, 10));
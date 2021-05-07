var solveSudoku = function(board) {
    const rowRecord = new Array(9).fill(null).map((ele)=> new Array(9).fill(false));
    const colRecord = new Array(9).fill(null).map((ele)=> new Array(9).fill(false));
    const block = new Array(9).fill(null).map((ele)=> new Array(9).fill(false));
    const spaces = []; // record the position of spaces

    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(board[i][j]=='.')
                spaces.push([i, j]);
            else{
                const value = parseInt(board[i][j]);
                rowRecord[i][value - 1] = true;
                colRecord[j][value - 1] = true;
                block[Math.floor(i / 3) * 3 + Math.floor(j / 3)][value - 1] = true;
            }
        }
    }
    const dfs = function(index){
        if(index < spaces.length){
            const x = spaces[index][0];
            const y = spaces[index][1];
            for(k = 1; k <= 9; k++){
                // console.log(rowRecord[x][k - 1]);
                // console.log(colRecord[y][k - 1]);
                // console.log(block[Math.floor(x / 3) * 3 + Math.floor(y / 3)][k - 1]);
                if(rowRecord[x][k - 1]==false && colRecord[y][k - 1]==false && block[Math.floor(x / 3) * 3 + Math.floor(y / 3)][k - 1]==false){
                    // fill in with k
                    rowRecord[x][k - 1]=true;
                    colRecord[y][k - 1]=true;
                    block[Math.floor(x / 3) * 3 + Math.floor(y / 3)][k - 1]=true;
                    console.log("x, k-1", x, k - 1);
                    console.log("y", y);
                    console.log("block Num",Math.floor(x / 3) * 3 + Math.floor(y / 3));
                    board[x][y] = String.fromCharCode('0'.charCodeAt() + k);
                    const result = dfs(index + 1);
                    if(result){ // can fill this
                        console.log("here");
                        return true;
                    }else{
                        // trace-back
                        rowRecord[x][k - 1]=false;
                        colRecord[y][k - 1]=false;
                        block[Math.floor(x / 3) * 3 + Math.floor(y / 3)][k - 1]=false;
                        board[x][y] = '.';
                    }
                }
            }
            // all of above cannot return
            return false;
        }else{
            return true; // done!
        }
    }
    dfs(0);
    return board;
};
const board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]];
const answer = solveSudoku(board);
console.log(answer);
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
 var setZeroes = function(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    let firstRow = false;
    let firstCol = false;

    for(let j = 0; j < n; j++){
        if(matrix[0][j]==0){
            firstRow = true;
            break;
        }
    }

    for(let i = 0; i < m; i++){
        if(matrix[i][0]==0){
            firstCol = true;
            break;
        }
    }

    for(let i = 1; i < m; i++){
        for(let j = 1; j < n; j++){
            if(matrix[i][j]==0){
                matrix[i][0] = 1; // has zero
                matrix[0][j] = 1;
            }
        }
    }
    console.log(matrix);

    for(let i = 1; i < m; i++){
        if(matrix[i][0]){
            matrix[i] = new Array(n).fill(0);
        }
    }
    for(let j = 1; j < n; j++){
        if(matrix[0][j]){
            for(let i = 0; i < m; i++){
                matrix[i][j] = 0;
            }
        }
    }
    if(firstRow)
        matrix[0] = new Array(n).fill(0);
    if(firstCol){
        for(let i = 0; i < m; i++){
            matrix[0][i] = 0;
        }
    }
};
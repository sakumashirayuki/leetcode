const values = [1,2,3,4,5,6,7];
// egdes: vex1, vex2, distance
const edges = [[1,2,2],[1,4,1],[2,4,3],[2,5,10],[3,1,4],[3,6,5],[4,3,2],[4,5,2],[4,6,8],[4,7,4],[5,7,6],[7,6,1]];
const n = values.length;
const adjmatrix = new Array(n + 1);// from 1 to n
for(let i = 0; i < n + 1; i++){
    adjmatrix[i] = new Array(n + 1).fill(Number.MAX_SAFE_INTEGER); // all edge dist init to infinite
    adjmatrix[i][i] = 0;
}
for(const edge of edges){
    adjmatrix[edge[0]][edge[1]] = edge[2];
}
const distance = JSON.parse(JSON.stringify(adjmatrix)); // deep copy the adjmatrix
const path = new Array(n + 1);
for(let i = 0; i < n + 1; i++){
    path[i] = new Array(n + 1).fill(-1);// all path are initialized to have no vertex
}
for(let k = 1; k <= n; k++){ // for each vertex, whether it can connected the other two vertexs
    for(let i  = 1; i <= n; i++){ 
        for(let j = 1; j <= n; j++){
            if(distance[i][j] > distance[i][k] + distance[k][j]){ // use k to connect i and j is shorter
                distance[i][j] = distance[i][k] + distance[k][j];
                path[i][j] = k;
            }
        }
    }
}
console.log(distance[1][7]," ",path[1][7]);
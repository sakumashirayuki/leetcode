class UnionFind{
    constructor(n){
        this.parent = new Array(n + 1).fill(0).map((_, id)=>id);
        this.rank = new Array(n + 1).fill(1);
    }
    find(x){
        if(this.parent[x]==x){
            return this.parent[x];
        }else{
            this.parent[x] = this.find(this.parent[x]);
            return this.parent[x];
        }
    }
    union(x, y){
        const xRoot = this.find(x);
        const yRoot = this.find(y);
        if(xRoot==yRoot)
            return;
        if(this.rank[xRoot]>=this.rank[yRoot]){ // union yRoot to xRoot
            this.parent[yRoot] = xRoot;
            this.rank[xRoot] += this.rank[yRoot];
        }else{
            this.parent[xRoot] = yRoot;
            this.rank[yRoot] += this.rank[xRoot];
        }
    }

    isConnected(x, y){
        const xRoot = this.find(x);
        const yRoot = this.find(y);
        if(xRoot==yRoot)
            return true;
        else
            return false;
    }
}

const values = [1,2,3,4,5,6,7];
// egdes: vex1, vex2, distance
const edges = [[1,2,2],[2,1,2],[1,4,1],[4,1,1],[1,3,4],[3,1,4],[2,4,3],[4,2,3],[2,5,10],[5,2,10],[4,3,2],[3,4,2],[3,6,5],[6,3,5],[4,5,7],[5,4,7],[4,6,8],[6,4,8],[4,7,4],[7,4,4],[5,7,6],[7,5,6],[7,6,1],[6,7,1]];
const unionFindSet = new UnionFind(values.length);// it begins at 1
console.log(unionFindSet.parent);
const mst = [];// contain the edge
edges.sort((a,b)=>a[2] - b[2]);// sort it
while(mst.length != values.length - 1){
    const currentEdge = edges.shift(); // get the min-weight edge: [v1, v2, weight]
    const value1 = currentEdge[0];
    const value2 = currentEdge[1];
    console.log("value1", value1);
    console.log("value2", value2);
    console.log(unionFindSet.isConnected(value1, value2));
    if(!unionFindSet.isConnected(value1, value2)){ // these two vertexs are not connecting
        unionFindSet.union(value1, value2);
        mst.push(currentEdge);
    }
    console.log(unionFindSet.parent);
}
console.log(mst);
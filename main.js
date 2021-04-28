class Vex{
    constructor(value){
        this.data = value;
        this.edge = [];// edge list: [vex, weight]
        this.dist = Number.MAX_SAFE_INTEGER; // min weight
        this.path = null; // the vertex connecting to it
        this.known = false;
        this.in = 0; // the indegree of the vex
    }
}

class Graph{ // undirected graph
    constructor(v, vr){ // v is the value array, vr is the edge array
        const vexs = new Array(v.length).fill(null).map((_,id)=>new Vex(v[id])); // v and vexs have corresponding index
        for(const edge of vr){
            const v1 = v.indexOf(edge[0]); // 
            const v2 = v.indexOf(edge[1]); // v1 is the index of vertex1, v2 is the index of vertex2
            vexs[v1].edge.push([vexs[v2], edge[2]]); 
            vexs[v2].in++;
        }
        this.adjmatrix = vexs;
        this.n = this.adjmatrix.length;
    }

    minDistance(){ // return the index of the smallest unknown distance vertex
        // O(N), because we don't have built-in priority queue
        let min = Number.MAX_SAFE_INTEGER;
        let minIndex;
        for(let i = 0; i < this.n; i++){
            if(this.adjmatrix[i].dist <= min && !this.adjmatrix[i].known){
                minIndex = i;
                min = this.adjmatrix[i].dist;
            }
        }
        return minIndex;
    }

    prim(){ // Minimum spanning tree, prim method
        for(let i = 0; i < this.n; i++){
            const currentVexIndex = this.minDistance();
            const currentVex = this.adjmatrix[currentVexIndex];
            currentVex.known = true;
            for(const [adjVex, weight] of currentVex.edge){
                if(!adjVex.known){
                    if(weight < adjVex.dist){
                        adjVex.dist = weight;
                        adjVex.path = currentVex;
                    }
                }
            }
        }
    }

}

const values = [1,2,3,4,5,6,7];
// egdes: vex1, vex2, distance
const edges = [[1,2,2],[2,1,2],[1,4,1],[4,1,1],[1,3,4],[3,1,4],[2,4,3],[4,2,3],[2,5,10],[5,2,10],[4,3,2],[3,4,2],[3,6,5],[6,3,5],[4,5,7],[5,4,7],[4,6,8],[6,4,8],[4,7,4],[7,4,4],[5,7,6],[7,5,6],[7,6,1],[6,7,1]];
const myGraph = new Graph(values, edges);
myGraph.prim(); 
// console.log(myGraph);
for(const vertex of myGraph.adjmatrix){
    if(vertex.path)
        console.log(vertex.data, "-",vertex.path.data);
    else
        console.log(vertex.data, "- null");
}
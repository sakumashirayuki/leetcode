class Vex{
    constructor(value){
        this.data = value;
        this.edge = [];// use adjacent matrix, contain the index
        this.in = 0; // the indegree of the vex
    }
}

class Graph{
    constructor(v, vr){ // v is the value array, vr is the edge array
        const vexs = new Array(v.length).fill(null).map((_,id)=>new Vex(v[id])); // v and vexs have corresponding index
        for(const edge of vr){
            const v1 = v.indexOf(edge[0]); // from vertex1 to vertex2
            const v2 = v.indexOf(edge[1]); // v1 is the index of vertex1, v2 is the index of vertex2
            vexs[v1].edge.push(vexs[v2]); // a better way is to add the vertex object to it
            vexs[v2].in++;
        }
        this.adjmatrix = vexs;
    }
}

const findNewVertexOfIndegreeZero = (G)=>{
    let zeroInVertex = null;
    const vexNumber = G.adjmatrix.length;
    for(let i = 0; i < vexNumber; i++){
        if(G.adjmatrix[i]&&G.adjmatrix[i].in===0){ // some vertex has been deleted
            zeroInVertex = G.adjmatrix[i]; // copy this vertex instance
            break;
        }
    }
    return zeroInVertex;
}

const topsort = (G)=>{
    const n = G.adjmatrix.length; // number of vertex
    const sortArray = []; 
    const queue = []; // a queue to store all the vertex that indegree is 0
    for(vertex of G.adjmatrix){
        if(vertex.in===0)
            queue.push(vertex);
    }
    while(queue.length){
        const curVertex = queue.shift();
        sortArray.push(curVertex.data);
        for(const adjacentV of curVertex.edge){ // adjacentV is the vertex object
            // console.log(adjacentV);
                adjacentV.in--;
                if(adjacentV.in===0)
                    queue.push(adjacentV);
        }
    }
    return sortArray;
}

const values = [1,2,3,4,5,6,7];
const edges = [[1,2],[1,3],[1,4],[2,4],[2,5],[3,6],[4,3],[4,6],[4,7],[5,4],[5,7],[7,6]];
const myGraph = new Graph(values, edges);
console.log(topsort(myGraph));
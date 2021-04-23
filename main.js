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
            vexs[v1].edge.push(v2);
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
            zeroInVertex = JSON.parse(JSON.stringify(G.adjmatrix[i])); // copy this vertex instance
            G.adjmatrix[i] = null; // delete this vertex
            break;
        }
    }
    return zeroInVertex;
}

const topsort = (G)=>{
    const n = G.adjmatrix.length; // number of vertex
    const sortArray = []; 
    // for(let i = 0; i < n; i++){
    //     const v = findNewVertexOfIndegreeZero(G); // return the vertex
    //     if(v==null)
    //         throw Error("there's a cycle in the graph!");   
    //     sortArray.push(v.data);
    //     // delete this vertex
    //     for(const adjacentVInd of v.edge){ // adjacentV is the index in adjmatrix
    //         if(G.adjmatrix[adjacentVInd]){// some have been deleted to null
    //             G.adjmatrix[adjacentVInd].in--;
    //         } 
    //     }
    // }
    const queue = []; // a queue to store the zeroIndegree vertexs
    const v = findNewVertexOfIndegreeZero(G); // return the vertex
    queue.push(v);
    
    return sortArray;
}

const values = [1,2,3,4,5,6,7];
const edges = [[1,2],[1,3],[1,4],[2,4],[2,5],[3,6],[4,3],[4,6],[4,7],[5,4],[5,7],[7,6]];
const myGraph = new Graph(values, edges);
console.log(topsort(myGraph));
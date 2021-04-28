class Vex{
    constructor(value){
        this.data = value;
        this.edge = [];// edge list: [vex, weight]
        this.dist = Number.MAX_SAFE_INTEGER;
        this.path = null; // the previous vertex on the path
        this.in = 0; // the indegree of the vex
    }
}

class Graph{
    constructor(v, vr){ // v is the value array, vr is the edge array
        const vexs = new Array(v.length).fill(null).map((_,id)=>new Vex(v[id])); // v and vexs have corresponding index
        for(const edge of vr){
            const v1 = v.indexOf(edge[0]); // from vertex1 to vertex2
            const v2 = v.indexOf(edge[1]); // v1 is the index of vertex1, v2 is the index of vertex2
            vexs[v1].edge.push([vexs[v2], edge[2]]); 
            vexs[v2].in++;
        }
        this.adjmatrix = vexs;
        this.n = this.adjmatrix.length;
    }

    weightedNegative(s){ // s is a vex
        s.dist = 0;
        const queue = [];
        queue.push(s);
        while(queue.length){
            const currentVex = queue.shift();
            for(const [adjVex, weight] of currentVex.edge){
                if(currentVex.dist + weight < adjVex.dist){
                    adjVex.dist = currentVex.dist + weight;
                    adjVex.path = currentVex;
                }
                if(!queue.find((ele)=>ele==adjVex)){ // not in the queue
                    queue.push(adjVex);
                }
            }
        }
    }

    printPath(v){// recursive print the path
        if(v==null)
            return;
        this.printPath(v.path);
        console.log("to");
        console.log(v.data);
    }
}

const values = ['A', 'B', 'C', 'D', 'E'];
// egdes: vex1, vex2, distance
const edges = [['A','B',210],['A','D',100],['A','E',20],['B','C',20],['B','D',-150],['C','E',10],['D','C',-30],['D','E',60]];
const myGraph = new Graph(values, edges);
myGraph.weightedNegative(myGraph.adjmatrix[0]); // start point is the vex with value of 1
myGraph.printPath(myGraph.adjmatrix[4]);
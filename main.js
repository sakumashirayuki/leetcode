class Vex{
    constructor(value){
        this.data = value;
        this.edge = [];// edge list: [vex, weight]
        this.dist = Number.MAX_SAFE_INTEGER;
        this.path = null; // the previous vertex on the path
        this.known = false;
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

    unweight(s){ // s is a vex
        const queue  = [];
        s.dist = 0;
        queue.push(s);
        while(queue.length){
            let currentVex = queue.shift();
            let currentDist = currentVex.dist;
            for(const adjVex of currentVex.edge){
                if(adjVex.dist==Number.MAX_SAFE_INTEGER){ // means haven't visited
                    adjVex.dist = currentDist + 1;
                    queue.push(adjVex);
                }
            }
        }
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

    dijsktra(s){ // s is a vex
        s.dist = 0; // the starting vertex
        for(let i = 0; i < this.n - 1; i++){ // we don't calculate the starting vertex
            const currentVexIndex = this.minDistance();
            // console.log(currentVexIndex);
            const currentVex = this.adjmatrix[currentVexIndex];
            currentVex.known = true;
            for(const [adjVex, weight] of currentVex.edge){
                if(!adjVex.known){
                    if((currentVex.dist + weight) < adjVex.dist){
                        // update the dist
                        adjVex.dist = currentVex.dist + weight;
                        // add to path
                        adjVex.path = currentVex;
                    }
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

const values = [1,2,3,4,5,6,7];
// egdes: vex1, vex2, distance
const edges = [[1,2,2],[1,4,1],[2,4,3],[2,5,10],[3,1,4],[3,6,5],[4,3,2],[4,5,2],[4,6,8],[4,7,4],[5,7,6],[7,6,1]];
const myGraph = new Graph(values, edges);
myGraph.dijsktra(myGraph.adjmatrix[0]); // start point is the vex with value of 1
// console.log(myGraph);
myGraph.printPath(myGraph.adjmatrix[6]);
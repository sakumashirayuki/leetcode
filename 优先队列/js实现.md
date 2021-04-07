## 数组实现
可以入队复杂度O(1)，出队复杂度O(N)，出队时找最优先值；也可以入队复杂度O(N),出队时复杂度O(1),入队时排序
### 源码
```javascript
class priorityQueue{
    constructor(arr){
        if(arr.length){
            this.tree = arr;
        }else{
            this.tree = [];
        }
    }
    enqueue(val){
        this.tree.push(val);
    }
    dequeue(){
        let maxIndex = 0;
        for(let i = 0; i < this.tree.length; i++){
            maxIndex = this.tree[i] >= this.tree[maxIndex] ? i : maxIndex;
        }
        return this.tree.splice(maxIndex, 1);
    }
}
```
## 堆实现
入队复杂度O(logN)，出队复杂度O(logN)
### 源码
```javascript
class Heap{
    constructor(compare){
        this.arr = [0]; // discard index 0
        this.compare = (typeof compare === 'function') ? compare : this._defaultCompare;
    }
    get size(){
        return this.arr.length - 1;
    }

    push(item){
        // add to the end
        let { arr } = this;
        arr.push(item);
        // float up
        this._up(arr.length - 1);
    }

    pop(){
        let { arr } = this;
        if(arr.length - 1 === 0) // whether the heap is empty
            return null;
        [arr[1], arr[arr.length - 1]] = [arr[arr.length - 1], arr[1]];
        let res = arr.pop();
        this._down(1);
        return res;
    }
    static heapify(data, compare = undefined){
        let heap = new Heap(compare);
        for( let item of data){
            heap.push(item);
        }
        return heap;
    }
    //
    _defaultCompare(a, b){
        return a > b;
    }
    _up(k){ // float up the k th element
        let {arr, compare, _parent} = this;
        while(k > 1 && compare(arr[k],  arr[_parent(k)])){
            [arr[k], arr[_parent(k)]] = [arr[_parent(k)], arr[k]];
            k = _parent(k);
        }
    }
    _down(k){ // float down the k th element
        let {arr, compare, _leftChild, _rightChild} = this;
        let size = arr.length - 1;
        while(_leftChild(k) <= size){
            // choose left or right
            let child = _leftChild(k);
            if(_rightChild(k) <= size && compare(arr[_rightChild(k)], arr[child])){
                child = _rightChild(k);
            }
            // compare k with child
            if(compare(arr[k], arr[child])) return;
            [arr[k], arr[child]] = [arr[child], arr[k]];
            k = child;
        }
    }
    _parent(k){ // get the parent index
        return k>>1;
    }
    _leftChild(k){
        return 2 * k;
    }
    _rightChild(k){
        return 2 * k + 1;
    }
}
```

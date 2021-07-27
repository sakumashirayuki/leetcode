const getEmpty = (o) => {
    if(Object.prototype.toString.call(o) == '[Object Object]')
        return {};
    if(Object.prototype.toString.call(o) == '[Object Array]')
        return [];
    return o;
}
const deepCopy = (origin) => {
    const target = getEmpty(origin);
    const stack = [];//[target, origin]
    const map = new Map(); // key: origin, value: target
    if(target!=origin){
        stack.push([target, origin]);
        map.set(origin, target);
    }
    while(stack.length){
        const [t, o] = stack.pop();
        for(const key in o){
            if(map.has(key)){
                t[key] = map.get(key);
            }else{
                t[key] = getEmpty(o[key]);
                if(t[key]!=o[key]){
                    stack.push([t[key], o[key]]);
                    map.set(o[key], t[key])
                }
            }
        }
    }
    return target
}

console.log(deepCopy({a:1}));
console.log(deepCopy([1,2,{a:[3,4]}]))
console.log(deepCopy(function(){return 1;}))
console.log(deepCopy({
    x:function(){
        return "x";
    },
    val:3,
    arr: [
        1,
        {test:1}
    ]
}))

let circle = {};
circle.child = circle;
console.log(deepCopy(circle));

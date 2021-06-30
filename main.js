var findLadders = function(beginWord, endWord, wordList) {
    // bfs
    const queue = [];
    const wordMap = new Map(); // undirected graph
    const levelMap = new Map();
    const visited = new Set(); // prevent from repeating acess the word
    let finished = false;
    queue.push(beginWord);
    let level = 0;
    levelMap.set(beginWord, 0);
    visited.add(beginWord);
    while(queue.length){
        const length = queue.length;
        level++;
        for(let i = 0; i < length; i++){
            // for each word in the current level
            const word = queue.shift();
            for(let j = 0; j < word.length; j++){
                for(let k = 97; k <= 122; k++){
                    if(word[j]!=String.fromCharCode(k)){
                        const newWord = word.substring(0, j) + String.fromCharCode(k) + word.substring(j + 1);
                        if(wordList.includes(newWord)){ // word in the wordList
                            // add record to the wordMap
                            if(wordMap.has(newWord)){
                                wordMap.get(newWord).push(word); // add parent
                            }else{
                                wordMap.set(newWord, [word]);
                            }
                            // if the newWord is the endWord
                            if(newWord==endWord)
                                finished = true;
                            if(!visited.has(newWord)){ // has not been visited
                                // add record to the levelMap
                                levelMap.set(newWord, level);
                                queue.push(newWord);
                                visited.add(newWord); // prevent from repeating enque
                            }
                        }
                    }
                }
            }
        }
    }
    if(!finished)
        return []; // cannot find the converting path
    // console.log(wordMap);
    console.log(levelMap);
    const path = [];
    const result = [];
    const dfs = (start) => {
        // ending condition
        if(start == beginWord){ // start is already in the path
            result.push([start, ...path]);
        }else{
            path.unshift(start);
            for(const parent of wordMap.get(start)){
                if(levelMap.get(parent)===(levelMap.get(start) - 1)){ // shortest path
                    // console.log(path, parent);
                    dfs(parent);
                }
            }
            // back track
            path.shift();
        }
    }
    dfs(endWord);
    return result;
};
const beginWord = "qa";
const endWord = "sq";
const wordList = ["si","go","se","cm","so","ph","mt","db","mb","sb","kr","ln","tm","le","av","sm","ar","ci","ca","br","ti","ba","to","ra","fa","yo","ow","sn","ya","cr","po","fe","ho","ma","re","or","rn","au","ur","rh","sr","tc","lt","lo","as","fr","nb","yb","if","pb","ge","th","pm","rb","sh","co","ga","li","ha","hz","no","bi","di","hi","qa","pi","os","uh","wm","an","me","mo","na","la","st","er","sc","ne","mn","mi","am","ex","pt","io","be","fm","ta","tb","ni","mr","pa","he","lr","sq","ye"];
console.log(findLadders(beginWord, endWord, wordList));
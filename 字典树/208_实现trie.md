## 题目描述
Trie（发音类似 "try"）或者说 前缀树 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补完和拼写检查。

请你实现 Trie 类：

Trie() 初始化前缀树对象。
void insert(String word) 向前缀树中插入字符串 word 。
boolean search(String word) 如果字符串 word 在前缀树中，返回 true（即，在检索之前已经插入）；否则，返回 false 。
boolean startsWith(String prefix) 如果之前已经插入的字符串 word 的前缀之一为 prefix ，返回 true ；否则，返回 false

## 前缀树数据结构分析
节点类有两个属性，```next[i]```保存着下一个字符i的节点引用，```isEnd```表示当前节点是否为一个单词的结束位置。由此可见，节点本身不存储任何字符，字符保存在next的key中。

插入字符串:
对字符串的每个字符，有两种情况：
1. 子节点存在。移动到子节点
2. 子节点不存在，new 一个子节点

所有字符插入完毕后，当前子节点```isEnd```设为true，表示结尾。其余的查找功能（完整字符串、前缀）遵循相同的流程

## 源码
```javascript
var TrieNode = function() {
    this.next = {};
    this.isEnd = false;
};

var Trie = function() {
    this.root = new TrieNode();
};

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    const wordLength = word.length;
    let currentNode = this.root;
    for(let i = 0; i < wordLength; i++){
        const ch = word[i];
        if(!currentNode.next[ch]){ // currentNode[ch] is null
            currentNode.next[ch] = new TrieNode();
        }
        currentNode = currentNode.next[ch];
    }
    currentNode.isEnd = true;
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    const wordLength = word.length;
    let currentNode = this.root;
    for(let i = 0; i < wordLength; i++){
        const ch = word[i];
        if(!currentNode.next[ch]){
            return false;
        }
        currentNode = currentNode.next[ch];
    }
    return currentNode.isEnd;
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    const wordLength = prefix.length;
    let currentNode = this.root;
    for(let i = 0; i < wordLength; i++){
        const ch = prefix[i];
        if(!currentNode.next[ch]){
            return false;
        }
        currentNode = currentNode.next[ch];
    }
    return true;
};
```
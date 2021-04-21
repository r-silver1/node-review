/*
https://www.youtube.com/watch?v=wrx29qSadCU&list=PL2SluYPF9ZQXqVuw9-Z5zIPhCqMRwcSlf&index=10
A permutation, also called an "arrangement number" or "order", is a rearrangement of the elements
of an ordered list S into a one-to-one correspondonce with S itself. A string of length n has
n! permutations

Below are the permutations of string ABC
ABC ACB BAC BCA CBA CAB

Question: Given an input string find all permutations of that string
Usage in Node JS command prompt: 
```node recur-string-perm.js <input>```
--i.e: 
```node recur-string-perm.js abc```
output:
```{ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' }```

*/

//process input and set global variables
function getInput() {
    let inArg = process.argv.slice(2);
    if (inArg.length != 1) {
        console.log("invalid number of arguments passed");
        process.exit(2);
    }
    console.log("initial: " + inArg[0]);
    charArr = inArg[0].split('');
    return charArr;
    
}

let tempSwap = (input, i, j) => { temp = input[i]; input[i] = input[j]; input[j] = temp; return input }

function getPerms(input, l, r){
    var inputArr = [];
    if(l==r){
        inputArr.push(input.join(''));
        return inputArr;
    }
    for(var i = l; i<input.length; i++){
        input = tempSwap(input, l, i)
        var retArr = getPerms(input, l+1, r);
        retArr.forEach(val=>{
            inputArr.push(val);
        })
        input = tempSwap(input, l, i)
    }
    return inputArr;
}

function main(){
    var stringIn = getInput();
    var permArr = getPerms(stringIn, 0, stringIn.length-1);
    console.log("All Permutations ("+permArr.length+"):");
    console.log(permArr);
}

main();
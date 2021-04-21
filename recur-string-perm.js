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

Solution: Robert Silver 2021
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

let tempSwap = (i, j) => { temp = charArr[i]; charArr[i] = charArr[j]; charArr[j] = temp }

//recursive function to generate array of -all- permutations, non unique
function getPerms(chars, pos) {
    //break up input into first letter and all remaining letters
    let head = [chars[pos]];
    let body = [];
    for (i = 0; i < chars.length; i++) {
        if (i != pos) {
            body.push(chars[i]);
        }
    }

    //body length greater than two: have more letters/recursive calls to process
    if (body.length > 2) {
        //hold all permutations to be made
        //danger! not having explicit "var" declaration here/implicit declaration causes headaches with recursion
        var loopTerms = [];
        //have to call recursive function starting at every position of body
        for (var j = 0; j < body.length; j++) {
            //have to explicitly shallow copy or have problems with recursion (bad times)
            let tempPerms = [...getPerms(body, j)];
            //go through every result in temp and add on head
            for (var k = 0; k < tempPerms.length; k++) {
                loopTerms.push(head[0] + tempPerms[k])
            }
        }
        //return current processed permutations to parent
        return (loopTerms);
    }

    //body length is two: only two possibilities; stopping point for recursion 
    if (body.length == 2) {
        let permI = head.join('') + body[0] + body[1];
        let permII = head.join('') + body[1] + body[0];
        return [permI, permII]
    }

}

//herlper function for recursion
function recursiveHelper(charArr){
    let permMap = new Map();
    //handle non-trivial input cases needing recursion
    if(charArr.length>2){
        //starting at each position of initial string, generate permutations starting from that character
        for (indx = 0; indx < charArr.length; indx += 1) {
            let permsArr = getPerms(charArr, indx);
            //insert all permutations into map, elimination repeats
            permsArr.forEach(perm => {
                permMap.set(perm, 1);
            })
        }
    }else{
        //handle trivial length 1 and 2 cases
        if(charArr.length==1){
            permMap.set(charArr[0], 1);
        }else{
            permMap.set(charArr[0]+charArr[1], 1);
            permMap.set(charArr[1]+charArr[0], 1);
        }
    }
    return permMap;
}


function main() {
    let charArr = getInput();
    let permMap = recursiveHelper(charArr);
    console.log("permutations: (map)")
    console.log("num perms: " + permMap.size);
    //print out only keys of permutations, useful data
    console.log(permMap.keys());
}

main();
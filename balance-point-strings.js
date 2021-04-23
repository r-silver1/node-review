/*
Problem:
-------
for a given string, find the "balance position" of the string, such that the string has the same -set- of 
characters on either side of the breakpoint, irregardless of number or arrangment of characters. Then, find 
all combinations of characters satisfying this rule.

Usage:
------
user: input string i.e. node balance-point-strings.js <string>
ex:  node balance-point-strings.js cdccdc

Output:
-------
for input: cdccdc
output: 3
-breakpoint: each side needs at least one *c* and one *d* on each side
-valid combinations (count and output 3): 
--------------------
cdc-cdc
cdcc-cd
cd-cdcc

-invalid combinations
--------------------
d-cdccc
cdccc-d
c-cccdd
etc.

for input: abab
output: 1
-valid combinations (count and output 1): 
--------------------
ab-ab

-invalid combinations
--------------------
a-bab
b-aab
aa-bb
bb-aa

constraints: 2<N<50

for input: a
output: Invalid Input

//NOTE: instructions unclear, assumptions made
--all characters must be used
--mirrors are not equivalent and count twice, i.e cd-cdcc is not equiv. cdcc-cd

*/

main();

function main() {
    let input = process.argv[2];
    if (input.length <= 2 || input.length >= 50) {
        console.log("Invalid Input")
        process.exit(2);
    }

    let charArr = input.split('');
    let charMap = new Map();
    charArr.forEach(char => {
        if (charMap.get(char)) {
            charMap.set(char, charMap.get(char) + 1);
        } else {
            charMap.set(char, 1);
        }
    })
    let num = findBreaks(charMap);
    console.log("Number of combinations: " + num);


}

function findBreaks(charMap) {
    let num = 0;
    for (let value of charMap.values()) {
        //if a character is present less than two times, no balance point is possible
        if (value <= 1) {
            return num;
        }
    }
    let headArr = [];
    //get just the keys of the map: these are the unique characters, one of which will be present on each side 
    //of every combination of characters
    for (let key of charMap.keys()) {
        headArr.push(key);
        //every time we take one char from map, decrement by two since one of these chars will go to each side
        charMap.set(key, charMap.get(key) - 2);
    }
    // balance point characters are now stored in headArr
    
    //Now, push all remaining characters not in the head array to a pool of remaining characters
    let remainArr = []
    for (let entry of charMap.entries()) {
        for (let i = 0; i < Number(entry[1]); i++) {
            remainArr.push(entry[0])
        }
    }
    //Note: there are multiple for loops in this code, but I don't think it runs at O(n^2) time. The only time
    //the inner for loop would loop N times is with a string input like aaaa
    
    for (var j = 0; j < remainArr.length; j++) {
        //basically, take one off of remainArr, put on head, get first LHS. all other chars in remain Arr on head,
        //that's RHS. If they aren't equal, we found two new combos, print both and increment two. Are equal, only
        //found one new combo, increment by one and print one
        let comboFirst = headArr.join('') + remainArr.join('').slice(0, j + 1);
        let comboSecond = headArr.join('') + remainArr.join('').slice(j+1, remainArr.length);
        
        if(comboFirst!==comboSecond){
            console.log(comboFirst + "-" + comboSecond);
            console.log(comboSecond + "-" + comboFirst);
            num+=2;
        }else{
            console.log(comboFirst + "-" + comboSecond);
            num++;
        }    
        
    }
    
    return num;
}






//Make all strings in array equal by replacing minimum number of characters
let stringArr = process.argv.slice(2);
console.log("input: ");
console.log(stringArr);

let tempMap = new Map();
let numChanges = 0;

function checkStringInput(){
    let prevLen = -1;
    for(i = 0; i<stringArr.length; i+=1){
        value = stringArr[i];
        len = value.split('').length;
        if(prevLen == -1){
            prevLen = len;
        }else{
            if(prevLen!=len){
                console.log("You must enter words/strings of equal length")
                return false;
            }
        }
    }
    return true;
}

function mapVals(indx) {
    tempMap = new Map();
    //for each string split into chars and look at indx position of each
    stringArr.forEach(value => {
        let charArr = value.split('');
        //go through all strings at that position and see how many times have each character
        if (tempMap.has(charArr[indx])) {
            tempMap.set(charArr[indx], tempMap.get(charArr[indx]) + 1);
        } else {
            tempMap.set(charArr[indx], 1);
        }
    });
}

//find the max and min frequency keys
function getMaxMap() {
    let max = 0;
    let maxKey = "";
    let min = Infinity;
    let minKey = "";
    for (let [key, value] of tempMap.entries()) {
        if (value > max) {
            max = value;
            maxKey = key;
        }
        if (value <= min) {
            min = value;
            minKey = key;
        }
    }
    return [minKey, maxKey];
}


//swap the character of a string at a given index if it matches the character to be swapped
//if multiple will only swap one character
function swapVals(vals, indx) {
    let old = vals[0];
    let newVal = vals[1];
    stringArr.forEach((value, i) => {
        let charArr = value.split('');
        //replace character if match
        if (charArr[indx] == old) {
            charArr[indx] = newVal;
            stringArr[i] = charArr.join('');
            numChanges += 1;
            console.log("change"+ numChanges+": ");
            console.log(stringArr);
            return;
        }
    })
    
};

let currIndx = 0;
//loop through all characters of equal length strings, swapping as necessary
function main() {
    if(!checkStringInput()){
        return;
    }
    while (currIndx < stringArr[0].length) {
        tempMap = new Map();
        while (tempMap.size != 1) {
            mapVals(currIndx);
            //get the max and min keys... keep iterating through swapping min for max in one string
            let maxMin = getMaxMap();
            if (!(maxMin[0] == maxMin[1])) {
                //swap min key character with max key character
                swapVals(maxMin, currIndx);
                
            }
        }
        currIndx += 1;
    }
    console.log("Number changes made: " + numChanges)
}

main();



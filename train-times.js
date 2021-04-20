
/*
In one pass, train A can start from the source station at time T[0], halt at each station for
h unit of time until it reaches the last stations at time T[N-1], where N is the positive integer
representing a total number of stations.

Given, Train A's timings at each unti of time as T[]={10.00, 10.04, 10.09, 10.14, 10.19, 10.22}

Now, Suppose Railway Admin wants to add more trains to increase the frequency. So, to launch other Train B,
for the same stations as of Tarin A's. Provided the Train B starts at time t, they would like to know the timings
for train B. The program should return a String array S (timestamp(in float)) for Train B at each station from first
to the last station (like strain A).

Note: time represented in 24-hour
start hour: [0,23]
start minute: [0,59]

input: t = 11.00
output: 11.00 11.04 11.09 11.15 11.19 11.22

input: t = -26.15
output: invalid output

https://www.youtube.com/watch?v=wVexYtpUHDs&list=PL2SluYPF9ZQXqVuw9-Z5zIPhCqMRwcSlf&index=11
*/
//ANSWER 
//array of increment values, each stop
const incArr = [.04, .05, .06, .04, .03];
//exit program on bad input
const invTime = function () { console.log("Invalid Input"); process.exit(2) }

//check validity of input and return hour and minute in number format
function valCheck(input) {
    if (input.length != 5) invTime();
    var hour = Number(input.slice(0, 2));
    if (isNaN(hour) || hour < 0 || hour > 23) invTime();
    var minute = Number(input.slice(3, 5));
    if (isNaN(minute) || minute < 0 || minute > 59) invTime();
    minute*=.01;
    return [hour, minute];
}

//from input array, generate number array of all stop times, returning hour and minute
//use modulo to handle overflow, return string array of hours and minutes
function genNumArr(inputArr) {
    let strArr = [];
    let hour = inputArr[0];
    let minute = inputArr[1];
    strArr.push([hour, minute]);
    
    incArr.forEach(inc => {
        minute+=inc;
        if(minute>=.60){
            minute=minute%.60;
            hour+=1;
        }
        if(hour>=24){
            hour=hour%24
        }
        strArr.push([hour, minute]);
    })
    
    return strArr;
}

//take input and make it pretty for the Railway Admin's view. Question was ambiguous in asking for string array
//but showing input as one string of many numbers not commma seperated, hence join
function makePretty(input){
    let prettyArr = [];
    input.forEach(num =>{
        
        var hour = num[0].toString();
        if(hour.length==1){
            hour = "0"+hour;
        }
        var minute = num[1].toString().slice(1,4);
        if(minute=="") minute=":00";
        prettyArr.push(hour+minute);
    })
    return prettyArr;
}

//main call take in arguments and do logic; no return just console output
function main() {
    const args = process.argv.slice(2);
    var inputTime = args[0];
    let retArr = valCheck(inputTime);
    let newArr = genNumArr(retArr);
    let prettyArr = makePretty(newArr);
    console.log(prettyArr.join(" "));
}

main();


# swap-strings
Alternate Node JS answer to 
```https://www.youtube.com/watch?v=yIBukC3br9Q&amp;list=PL2SluYPF9ZQXqVuw9-Z5zIPhCqMRwcSlf&amp;index=16```
Robert Silver 2021

Maybe not as elegant as the solution given above but it's fun to play around with and works as far as I can tell.

Usage:
```
-clone, open root folder in Node JS Command Prompt
-run node swap-strings.js <arguments>
--i.e node swap-strings.js west east wait
```

Output:
```
input:
[ 'west', 'east', 'wait' ]
change1:
[ 'west', 'wast', 'wait' ]
change2:
[ 'wast', 'wast', 'wait' ]
change3:
[ 'wast', 'wast', 'wast' ]
Number changes made: 3
```

# train-times:
```
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
```

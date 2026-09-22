// program 1
const fs = require('fs');
//1 sync means ek time pe ek hi kaam ho
// 2 end
// 3 higher priority
// 4 micro
// 5 macro

console.log('1: start (sync)');

setTimeout(() => {
    console.log('2: Inside setTimeout (macrotask - runs later)');
}, 0);

Promise.resolve().then(() => {
    console.log('3: Inside Promise.then (microtask - runs before setTimeout)');
});

fs.readFile(__filename, () => {
    console.log('4: Inside fs.readFile callback (I/O)');
});

console.log('5: end (sync)')  
console.log("1: Start (sync)");

setTimeout(() => {
    console.log("2: setTimeout (macro task - timers phase)");
}, 0);

setImmediate(() => {
    console.log("3: setImmediate (macro task - check phase)");
});

process.nextTick(() => {
    console.log("4: process.nextTick (highest priority microtask)");
});

Promise.resolve().then(() => {
    console.log("5: Promise.then (microtask)");
});
console.log('6: End(sync)');
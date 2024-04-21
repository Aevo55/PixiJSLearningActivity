//TESTING SCRIPT FOR QUESTIONS 
console.log(true === 1) //False
console.log(true + true === 2) //true

console.log(0 == "0") //True
console.log(0 == []) //true
console.log("0" == []) //false

console.log((1/0) == (10 ** 1000)) //true

console.log(parseInt(0.00005) == 5) //false
console.log(parseInt(0.000005) == 5) //false
console.log(parseInt(0.0000005) == 5) //true

console.log(!!"" === false) //true

console.log(0.1 + 0.1 == 0.2) //true
console.log(0.1 + 0.2 == 0.3) //false

console.log([] == "") //true
console.log([,] == "") //true
console.log([,,] == "") //false
console.log([,,] == ",") //true
console.log([,] + [,] == ",") //false
console.log([,,] + [,,] == ",,") //true

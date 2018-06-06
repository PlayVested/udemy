function isEven(x) {
    return !isNaN(x) && (x % 2) === 0;
}

console.log(`4 ${isEven(4)}`);
console.log(`21 ${isEven(21)}`);
console.log(`68 ${isEven(68)}`);
console.log(`333 ${isEven(333)}`);

function factorial(x) {
    if (x < 2) {
        return 1;
    }

    return x * factorial(x-1);
}

console.log(`5: ${factorial(5)}`);
console.log(`2: ${factorial(2)}`);
console.log(`10: ${factorial(10)}`);
console.log(`0: ${factorial(0)}`);

function kebabToSnake(msg) {
    return msg.replace(/-/gi, `_`);
}

console.log(`hello-world = ${kebabToSnake('hello-world')}`);
console.log(`dogs-are-awesome = ${kebabToSnake('dogs-are-awesome')}`);
console.log(`blah = ${kebabToSnake('blah')}`);

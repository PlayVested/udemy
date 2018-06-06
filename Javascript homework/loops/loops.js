console.log(`numbers between -10 and 19`);
var i = -10;
while (i < 20) {
    console.log(i);
    i++;
}

for (var j = -10; j < 20; j++) {
    console.log(j);
}

console.log(`even numbers between 10 and 40`);
i = 10;
while (i <= 40) {
    console.log(i);
    i += 2;
}

for (var j = 10; j <= 40; j += 2) {
    console.log(j);
}

console.log(`odd numbers between 300 and 333`);
i = 300;
while (i <= 333) {
    if ((i % 2) !== 0) {
        console.log(i);
    }
    i++;
}

for (var j = 300; j <= 333; j++) {
    if ((j % 2) !== 0) {
        console.log(j);
    }
}

console.log(`divisible by 5 and 3`);
i = 5;
while (i <= 50) {
    if ((i % 3) === 0 && (i % 5) === 0) {
        console.log(i);
    }
    i++;
}

for (var j = 5; j <= 50; j++) {
    if ((j % 3) === 0 && (j % 5) === 0) {
        console.log(j);
    }
}

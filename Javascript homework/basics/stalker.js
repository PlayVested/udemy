// var firstName = prompt('What is your first name?');
// var lastName = prompt('What is your last name?');
var age = prompt('How old are you?');

// console.log(`Your full name is ${firstName} ${lastName}`);
// console.log(`You are ${age} years old`);

if (age < 0) {
    console.log("Error, you can't be a negative age");
}
if (age === 21) {
    console.log("Happy 21st birthday!");
}
if ((age % 2) === 1) {
    console.log("Your age is odd");
}
if (Math.sqrt(age) % 1 === 0) {
    console.log("perfect square!");
}

// alert(`You been alive for roughly ${age * 365.25} days`);
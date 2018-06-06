    var todos = [];

window.setTimeout(function() {
    do {
        var input = prompt("What do you want to do?");
        if (input === 'quit') {
            break;
        } else if (input === 'list') {
            // console.log(todos);
            todos.forEach((todo, index) => {
                console.log(`${index}: ${todo}`);
            });
        } else if (input === 'new') {
            var todo = prompt('Enter new todo:');
            todos.push(todo);
        } else if (input === 'delete') {
            var index = prompt('Enter item index:');
            todos.splice(index, 1);
        } else if (input === 'reverse') {
            printReverse([1,2,3,4,5]);
            printReverse(['a','b','c','d','e']);
        } else if (input === 'uniform') {
            isUniform([1,1,1,1]);
            isUniform([1,1,2,1]);
            isUniform(['a','b','c']);
            isUniform(['b','b','b']);
        } else if (input === 'sum') {
            sumArray([1,2,3]);
            sumArray([10,3,10,4]);
            sumArray([-5,100]);
        } else if (input === 'max') {
            max([1,2,3]);
            max([10,3,10,4]);
            max([-5,100]);
        } else if (input === 'movie') {
            var movies = [
                {
                    title: "Deadpool 2",
                    rating: 4,
                    haveWatched: true,
                },
                {
                    title: "The Notebook",
                    rating: 0,
                    haveWatched: true,
                },
                {
                    title: "Infinity War",
                    rating: 5,
                    haveWatched: false,
                },
            ];

            movies.forEach((movie) => {
                var msg = 'You have ';
                if (movie.haveWatched) {
                    msg += 'watched ';
                } else {
                    msg += 'not seen ';
                }
                msg += `"${movie.title} - ${movie.rating} stars"`;
                console.log(msg);
            });
        } else {
            console.log(`unknown command: ${input}`);
        }
    } while (true);
}, 500);

function printReverse(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        console.log(array[i]);
    }
}

function isUniform(array) {
    if (array.length) {
        var firstElement = array[0];
        for (var i = 1; i < array.length; i++) {
            if (firstElement !== array[i]) {
                console.log('false');
                return false;
            }
        }
    }

    console.log('true');
    return true;
}

function sumArray(array) {
    var total = 0;
    array.forEach(element => {
        total += element;
    });

    console.log(total);
    return total;
}

function max(array) {
    var curMax = array[0];
    array.forEach(element => {
        if (element > curMax) {
            curMax = element;
        }
    });

    console.log(`max: ${curMax}`);
    return curMax;
}
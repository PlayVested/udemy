const Campground = require('./models/campground');
const Comment = require('./models/comment');

// This static data was moved to the mongoDB
const defaultCampgrounds = [
    {
        name: 'yellowstone',
        image: 'http://www.wildnatureimages.com/images%203/060731-372..jpg',
        description: 'this is my description',
    },
    {
        name: 'backyard',
        image: 'https://cl9r93gnrb42o3l0v1aawby1-wpengine.netdna-ssl.com/wp-content/uploads/2018/02/Camping.jpg',
        description: 'totally pretty',
    },
    {
        name: 'your mom`s house',
        image: 'https://media.istockphoto.com/photos/golden-sunrise-illuminating-tent-camping-dramatic-mountain-landscape-picture-id526564828?k=6&m=526564828&s=612x612&w=0&h=dGJ7atG6qx7zMs0JNLCLcxQ5SAnWbQDlw5wFljirYLM=',
        description: 'the best ever',
    },
];

const defaultComments = [
    {
        text: 'This is the first comment!',
        author: {
            username: 'Your mom',
        },
    },
    {
        text: 'It is getting to be the witching hour',
        author: {
            username: 'An old guy',
        },
    },
    {
        text: 'I want to sleep',
        author: {
            username: 'me',
        },
    },
];

function createCampground(campground, comment) {
    Campground.create(campground, (err, newCampground) => {
        if (err) {
            console.error(`Error: ${err}`);
        } else {
            Comment.create(comment, (err, comment) => {
                if (err) {
                    console.error(err);
                } else {
                    newCampground.comments.push(comment);
                    newCampground.save();
                    console.error(`Created: ${newCampground}`);
                }
            });
        }
    });
}

// if there is nothing in the DB, populate it with a couple enrties
module.exports = () => {
    // uncomment this if you want to clear the DB first
    // Campground.remove({}, (err) => {
    //     console.log('All campgrounds have been removed');
    // });

    Campground.find({}, (err, campgrounds) => {
        if (err) {
            console.error(`Error: ${err}`);
        } else if (campgrounds.length === 0) {
            console.log('Createing default campgrounds');
            defaultCampgrounds.forEach((campground, idx) => {
                const comment = defaultComments[idx];
                createCampground(campground, comment);
            });
        } else {
            console.log('There is already campground data');
        }
    });
};
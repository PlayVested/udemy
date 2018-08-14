const postSchema = new mongoose.Schema({
    title: String,
    content: String,
});
const Post = new mongoose.model('Post', postSchema);

// this is how to embed one model inside another
const userSchemaEmbedded = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema],
});
const UserEmbedded = new mongoose.model('UserEmbedded', userSchemaEmbedded);

// This will create a new user model that can be manipulated
let newUser = new UserEmbedded({
    email: 'me@you.com',
    name: 'This Guy',
    posts: [
        {
            title: 'Junk You Own',
            content: 'Time to clean out your crap',
        },
        {
            title: 'Why would you do this?',
            content: 'Because you are dumb',
        },
    ]
});

// You can continue to modify after it is create...
newUser.posts.push({
    title: 'You can also push in new posts after the user is created',
    content: 'Works the same way',
});

// ...but it doesn't get stored until you call 'save()' on it
newUser.save((err, user) => {
    if (err) {
        console.error('Error: ' + err);
    } else {
        console.log('Save succeeded!\n' + user);
    }
});

// This is how you retrieve one from the DB
UserEmbedded.findOne({name: 'This Guy'}, (err, foundUser) => {
    if (err) {
        console.error('Error: ' + err);
    } else {
        console.log('I found the user!\n' + foundUser);

        // you can continue to modify them after they are stored...
        foundUser.posts.push({
            title: 'You can add posts here too',
            content: 'Keep the posts coming',
        });

        // ...but again you need to save before the changes will persist
        foundUser.save((err, savedUser) => {
            if (err) {
                console.error('Error: ' + err);
            } else {
                console.log('This should be different than above\n' + savedUser);
            }
        });
    }
});

// this is how to link things together with IDs instead of embedding them
const userSchemaRef = new mongoose.Schema({
    email: String,
    name: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }]
});
const UserRef = new mongoose.model('UserRef', userSchemaRef);

// I'm not sure if there is a real different between 'new Model' and 'Model.create()'
// I think this just does the save as part of the function
Post.create({
    title: 'Some text',
    content: 'The meat of the post',
}, (err, post) => {
    UserRef.findOne({email: 'blah@gmail.com'}, (err, foundUser) => {
        if (err) {
            console.error('Error: ' + err);
        } else {
            foundUser.posts.push(post);
            foundUser.save((err, data) => {
                if (err) {
                    console.error('Error: ' + err);
                } else {
                    console.log('Save succeeded!\n' + data);
                }
            });
        }
    });
});

UserRef.findOne({email: 'name@gmail.com'}).populate('posts').exec((err, user) => {
    if (err) {
        console.error('Error: ' + err);
    } else {
        console.log(user);
    }
});
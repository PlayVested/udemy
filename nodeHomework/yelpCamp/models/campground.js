const mongoose = require('mongoose');

// schema setup
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: String,
    comments: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
        }
     ],
     creator: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        username: String,
    },
});

module.exports = mongoose.model('Campground', campgroundSchema);

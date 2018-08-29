const express = require('express');
const router = express.Router({mergeParams: true});

const { cacheCampground } = require('../middleware/campground');
const { userOwnsComment } = require('../middleware/comment');
const isLoggedIn = require('../middleware/isLoggedIn');

const Comment = require('../models/comment');

// 'new' route
router.get('/new', isLoggedIn, cacheCampground, (req, res) => {
    const { campground } = res.locals;
    if (campground) {
        res.render('comments/new', {campground});
    }
});

// 'create' route
router.post('/', isLoggedIn, cacheCampground, (req, res) => {
    const { campground } = res.locals;
    if (campground) {
        // add in the user info
        let newComment = req.body.comment;
        newComment.creator = {
            id: req.user._id,
            username: req.user.username,
        };

        Comment.create(newComment, (err, comment) => {
            if (err) {
                console.err(`Error: ${err}`);
                res.redirect('/campgrounds');
            } else {
                campground.comments.push(comment);
                campground.save();
                res.redirect(`/campgrounds/${campground._id}`);
            }
        });
    }
});

// 'edit' route
router.get('/:commentID/edit', userOwnsComment, cacheCampground, (req, res) => {
    const { campground, comment } = res.locals;
    if (campground && comment) {
        res.render('comments/edit', {campground, comment});
    }
});

// 'update' route
router.put('/:commentID', userOwnsComment, cacheCampground, (req, res) => {
    // since we already have the comment we can update it directly and save
    // othwerwise we would need to do the following:
    //   Comment.findByIdAndUpdate(req.params.commentID, req.body.comment, (err, updatedComment) => {
    const { campground, comment } = res.locals;
    if (campground && comment) {
        Object.assign(comment, req.body.comment);
        comment.save();
        res.redirect(`/campgrounds/${campground._id}`);
    }
});

// 'delete' route
router.delete('/:commentID', userOwnsComment, (req, res) => {
    // since we already have the comment we can delete it directly
    // othwerwise we would need to do the following:
    //   Comment.findByIdAndRemove(req.params.commentID, (err) => {
    const { comment } = res.locals;
    if (comment) {
        // removing the comment from the DB cleans up the campground ref as well
        comment.remove((err) => {
            if (err) {
                console.error(`Error: ${err}`);
            }

            res.redirect(`/campgrounds/${campground._id}`);
        });
    }
});

module.exports = router;

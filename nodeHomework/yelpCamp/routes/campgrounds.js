const express = require('express');
const router = express.Router();

const isLoggedIn = require('../middleware/isLoggedIn');
const { userOwnsCampground } = require('../middleware/campground');

const Campground = require('../models/campground');

const { isOwner } = require('../utils/misc');

// 'index' route
router.get('/', (req, res) => {
    Campground.find({}, (err, campgrounds) => {
        if (err) {
            console.error(`Error: ${err.message}`);
        } else {
            res.render('campgrounds/index', {campgrounds});
        }
    });
});

// 'new' route
router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
});

// 'show' route
router.get('/:campgroundID', (req, res) => {
    Campground.findById(req.params.campgroundID).populate('comments').exec((err, campground) => {
        if (err) {
            console.error(`Error: ${err.message}`);
        } else {
            res.render('campgrounds/show', {campground, isOwner});
        }
    });
});

// 'create' route
router.post('/', isLoggedIn, (req, res) => {
    const newCampground = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        creator: {
            id: req.user._id,
            username: req.user.username,
        },
    };
    
    Campground.create(newCampground, (err, createdCampground) => {
        if (err) {
            console.error(`Error: ${err.message}`);
        } else {
            console.log('Created: ' + createdCampground);
            req.flash(`success`, `Successfully created campground!`);
            res.redirect('/campgrounds');
        }
    });
});

// 'edit' route
router.get('/:campgroundID/edit', userOwnsCampground, (req, res) => {
    const { campground } = res.locals;
    if (campground) {
        res.render('campgrounds/edit', {campground});
    }
});

// 'update' route
router.put('/:campgroundID', userOwnsCampground, (req, res) => {
    // since we already have the campground we can update it directly and save
    // othwerwise we would need to do the following:
    //   Campground.findByIdAndUpdate(req.params.campgroundID, req.body.campground, (err, updatedCampground) => {
    const { campground } = res.locals;
    if (campground) {
        Object.assign(campground, req.body.campground);
        campground.save();
        res.redirect(`/campgrounds/${campground._id}`);
    }
});

// 'delete' route
router.delete('/:campgroundID', userOwnsCampground, (req, res) => {
    // since we already have the campground we can delete it directly
    // othwerwise we would need to do the following:
    //   Campground.findByIdAndRemove(req.params.campgroundID, (err) => {
    const { campground } = res.locals;
    if (campground) {
        campground.remove((err) => {
            if (err) {
                console.error(`Error: ${err.message}`);
                req.flash(`error`, `Failed to remove campground: ${err.message}`);
            } else {
                req.flash(`success`, `Campground deleted`);
            }
    
            res.redirect('/campgrounds');
        });
    }
});

module.exports = router;
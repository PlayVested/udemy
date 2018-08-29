const Campground = require('../models/campground');
const isLoggedIn = require('./isLoggedIn');
const { isOwner } = require('../utils/misc');

module.exports = {
    /**
     * Passes if the campground referenced in req is found
     */
    cacheCampground: (req, res, next) => {
        Campground.findById(req.params.campgroundID, (err, campground) => {
            if (err) {
                console.error(`Error: ${err}`);
            }

            // pass the campground through to the next route
            res.locals.campground = campground;
            return next();
        });
    },

    /**
     * Passes if there is a valid user,
     * the campground referenced in req is found,
     * and the current user is the creator
     */
    userOwnsCampground: (req, res, next) => {
        isLoggedIn(req, res, () => {
            module.exports.cacheCampground(req, res, () => {
                const { campground } = res.locals;
                if (isOwner(req.user, campground, 'creator')) {
                    return next();
                }

                // clear out the campground so it isn't used by accident
                delete res.locals.campground;

                // if they are logged in but anything else goes wrong,
                // just send them back where they came from
                res.redirect('back');
            });
        });
    },
}

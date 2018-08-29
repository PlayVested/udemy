const Comment = require('../models/comment');
const isLoggedIn = require('./isLoggedIn');
const { isOwner } = require('../utils/misc');

module.exports = {
    /**
     * Passes if the comment referenced in req is found
     */
    cacheComment: (req, res, next) => {
        Comment.findById(req.params.commentID, (err, comment) => {
            if (err) {
                console.error(`Error: ${err}`);
            }

            // pass the comment through to the next route
            res.locals.comment = comment;
            return next();
        });
    },

    /**
     * Passes if there is a valid user,
     * the comment referenced in req is found,
     * and the current user is the creator
     */
    userOwnsComment: (req, res, next) => {
        isLoggedIn(req, res, () => {
            module.exports.cacheComment(req, res, () => {
                const { comment } = res.locals;
                if (isOwner(req.user, comment, 'author')) {
                    return next();
                }

                // clear out the comment so it isn't used by accident
                delete res.locals.comment;

                // if they are logged in but anything else goes wrong,
                // just send them back where they came from
                res.redirect('back');
            });
        });
    },
}

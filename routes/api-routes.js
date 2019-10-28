var db = require("../models");
var router = require('express').Router();

// AJAX user route
router.get("/api/user/", (req, res) => {
    db.user.findOne({
        where: {
            id: req.session.passport.user
        }
    }).then((dbUser) => {
        res.json(dbUser);
    });
});

// AJAX update email
router.put("/api/email", function (req, res) {
    db.user.update({
        email: req.body
    },
        {
            where: {
                id: req.session.passport.user
            }
        }).then(function (dbUser) {
            res.json(dbUser);
        });
});

module.exports = router;
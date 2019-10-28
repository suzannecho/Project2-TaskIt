//Learn more or give us feedback
var db = require("../models");
var passport = require('passport');
var router = require('express').Router();

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');

}

router.get("/signin/:id", (req, res) => {
    var id = req.params.id;
    db.user.findOne({
        where: {
            id: id
        }
    }).then(function (data) {
        if (data.phone) {
            res.redirect("/dashboard/" + id);
        } else {
            var info = {
                noPhone: true,
                user_id: id
            }
            res.render("signin", info);
        }
    });
});

router.post("/phone/:id", (req, res) => {
    var id = req.params.id;
    db.user.update({
        phone: req.body.phone
    }, {
            where: {
                id: id
            }
        }).then(function (data) {
            res.redirect("/dashboard/" + id);
        });
});


//TODO: need to flesh out and figure out how to pull correct info
router.get("/dashboard/:id", isLoggedIn, (req, res) => {
    var id = req.params.id;

    //the newly created user event is returned in the callback
    //this final database collects all the user tasks associated with a particular user and renders dashboard with the information
    db.user_task.findAll({
        where: { userId: req.session.passport.user },
        include: [db.user, db.tasks]
    }).then(function (singleUsersTasks) {
        //this doesnt do anything at the moment, the template needs to be written
        var userTasks = {
            tasks: singleUsersTasks
        }
        res.render("dashboard", userTasks);
    });
});

// // Local signin route
// router.get("/signin", (req, res) => {
//     res.render("signin");
// });


//removed isLoggedIn,
//dont think this is ever triggered?
// Dashboard route, protected by user logged in
router.get("/dashboard", isLoggedIn, (req, res) => {
    res.redirect("dashboard/" + req.session.passport.user);
});


// Logout Route, destroys current session when accessed
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    });
});

router.post('/signup', passport.authenticate('local-signup', {
    failureRedirect: '/'
}), function (req, res) {
    console.log("This is user info: " + req.session.passport.user);
    res.redirect("/signin/" + req.session.passport.user);
});

router.post('/login', passport.authenticate('local-signin', {
    failureRedirect: '/'
}), function (req, res) {
    res.redirect("/dashboard/" + req.session.passport.user)
});

// =====================================
// FACEBOOK ROUTES =====================
// =====================================
// route for facebook authentication and login
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_photos'] }));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/'
    }),
    function (req, res) {
        console.log("facebook info: " + req);
        res.redirect("/signin/" + req.session.passport.user);
    }
);

module.exports = router;
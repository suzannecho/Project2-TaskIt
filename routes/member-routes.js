var db = require('../models');
var router = require('express').Router();

router.get("/memberlist/:id", function (req, res) {
    var taskId = req.params.id;
    //var userId = req.session.passport.id;

    db.user_task.findAll({
        where: { taskId: taskId },
        include: [
            {
                model: db.user,
                attributes: ["phone", "firstname", "lastname", "id", "email"]
            },
            {
                model: db.tasks,
                attributes: ["task_name", "task_date", "location", "id"]
            }
        ]
    }).then(function (usertasks) {
        db.tasks.findOne({
            where: { id: taskId }
        }).then(function (singletask) {
            //returns an array of user_task objects

            var pulledUsertasks = {
                task: singletask,
                user_task: usertasks
            }
            console.log(pulledUsertasks.user_task[0].user.email);
            // console.log(pulledUsertasks.user_tasks.dataValues);
            res.render("member", pulledUsertasks);
        });
    });
});


router.post("/memberlist/:id", function (req, res) {
    var taskId = req.params.id
    db.user.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        password: taskId
    }).then(function (newmember) {
        db.user_task.create({
            userId: newmember.id,
            taskId: taskId,
            host: false
        }).then(function (newUsertask) {
            res.redirect("/memberlist/" + taskId);
        });
    });
});
module.exports = router;
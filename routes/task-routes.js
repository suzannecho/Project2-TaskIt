var db = require('../models');
var router = require('express').Router();

//gets all tasks
router.get('/task', function(req, res) {
    db.tasks.findAll({})
        .then(function(data) {
            res.json(data);
            console.log("gets all tasks.  task-routes.js line 9");
        });
});
//get all information about a specific task
router.get('/task/:id', function(req, res) {
    db.tasks.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(data) {
        res.json(data);
        console.log("get all information about a specific response. task-routes.js line 20");
    });
});
//finds a single member that is attending a specific task
router.get('/api/task/:taskid/:userid', function(req, res) {
    db.user_task.findOne({
        where: {
            taskId: req.params.taskid,
            userId: req.params.userid
        },
        include: [{
            model: db.user,
            attributes: ['phone', 'firstname', 'lastname']
        }]
    }).then(function(data) {
        res.json(data);
    });
});
//gets a single user from an task and deletes that user from the member list
router.delete('/api/task/:taskid/:userid', function(req, res) {
    db.user_task.destroy({
        where: {
            taskId: req.params.taskid,
            userId: req.params.userid
        }
    }).then(function(data) {
        res.json(data);
    });
});
//gets a single user from an task
router.get('/api/task/:id', function(req, res) {
    db.user_task.findAll({
        where: {
            userId: req.params.id
        }
    }).then(function(data) {
        res.json(data);
    });
});

router.post("/memberlist", function (req, res) {
    //The information for the form is taken and used to create an task in the tasks table
    db.tasks.create({
        task_name: req.body.task_name,
        task_date: req.body.task_date,
        location: req.body.location
    }).then(function (createdtask) {
        //the newly created task is returned in the callback
        //this function creates a new user_task and specifices the id's of the user and task relating the two tables
        db.user_task.create({
            //the user id is taken from the session to protect the user
            userId: req.session.passport.user,
            //the task id is taken from the newly created task
            taskId: createdtask.id,
            host: true,
            attending: true
        }).then(function (newUsertask) {
                //redirect for new member page
                //res.redirect("memberlist/"+newUsertask.taskId);
                res.redirect("/memberlist/"+ newUsertask.taskId);
            });
        });
    });

module.exports = router;
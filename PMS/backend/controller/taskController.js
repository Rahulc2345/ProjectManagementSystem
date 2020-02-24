var task = require('../model/task')
var backlog = require('../model/backlog')

var util = require('../util/jwtUtil');

exports.getTasks = (req, resp) => {
    task.find({}).sort({ "priority": 1 }).exec(
        (err, data) => {
            if (err) {
                resp.json(err);
            }
            else {
                console.log(data);
                resp.json(data);
            }
        }
    )


};

exports.getTaskById = (req, resp) => {
    task.find({ 'taskId': req.params.id }, (err, data) => {
        if (err) {
            resp.json(err);
        }
        else {
            console.log(data);
            resp.json(data);
        }
    })
};

exports.addTask = (req, resp) => {
    util.isAuthorize(req, resp, (payload) => {
        if (payload.role === 'admin') {
            let Task = new task({
                backlogId: req.body.backlogId,
                taskId: req.body.taskId,
                userId: req.body.userId,
                title: req.body.title,
                desc: req.body.desc,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                priority: req.body.priority,
                status: req.body.status
            });

            Task.save((err, data) => {
                if (err) {
                    console.log(err)
                    resp.json("could not add task" + err)
                }
                else {
                    console.log(data);
                    resp.json("Task inserted successfully")
                }
            })
        }
    })

};


exports.updateTask = (req, resp) => {
    util.isAuthorize(req, resp, (payload) => {
            task.findOneAndUpdate({ 'taskId': req.params.id },
                {
                    $set: req.body
                    // $set: {
                    //     name: req.body.name,
                    //     team_member: req.body.team_member,
                    //     scrum_master: req.body.scrum_master,
                    //     status: req.body.status
                    // }
                }, (err, data) => {
                    if (err) {
                        console.log(err)
                        resp.json("could not update" + err)
                    }
                    else {
                        console.log(data);
                        resp.json("Task updated")
                    }
                })
        })

};

exports.setUserForTask = (req, res) => {
    util.isAuthorize(req, res, (payload) => {
        if (payload.role === 'admin') {
            task.findOneAndUpdate({ 'taskId': req.params.id },
                {
                    $set: {
                        userId: req.body.userId
                    }
                }
                , (err, data) => {
                    if (err) {
                        console.log(err);
                        res.json("could not assign task " + err)
                    }
                    else {
                        console.log(data)
                        res.json("Task assigned to user")
                    }
                })
        }
    })
}

exports.deleteTask = (req, resp) => {
   // util.isAuthorize(req, resp, (payload) => {
      //  if (payload.role === 'admin') {
            task.findOneAndDelete({ 'taskId': req.params.id }, (err, data) => {
                if (err) {
                    console.log(err)
                    resp.json("could not delete" + err)
                }
                else {
                    console.log(data);
                    resp.json("Task deleted")
                }
            })
      //  }
  //  })
}

exports.getTasksUsingBacklogId = (req, resp) => {
    task.find({ 'backlogId': req.params.id }, (err, data) => {
        if (err) {
            console.log(err)
            resp.json("could not get" + err)
        }
        else {
            console.log(data);
            resp.json(data)
        }
    })
}

exports.getTasksUsingProjectId = (req, resp) => {
    backlog.find({ "projectId": req.params.id }).distinct("backlogId").exec((err, backlogId) => {
        if (err) {
            console.log(err)
            resp.json("could not get" + err)
        }
        else {
            task.find({ "backlogId": backlogId }, (err, data) => {
                if (err) {
                    console.log(err)
                    resp.json("could not get" + err)
                }
                else {
                    console.log(data);
                    resp.json(data)
                }
            })
        }

    })
}

var project = require('../model/project')
var backlog = require('../model/backlog')
var task = require('../model/task')
var util = require('../util/jwtUtil');


exports.getProjects = (req, resp) => {
    util.isAuthorize(req, resp, (payload) => {
        console.log(payload)
        if (payload.role === 'admin') {
            project.find({ "managerId": payload.id }, (err, data) => {
                if (err) {
                    resp.json(err);
                }
                else {
                    console.log(data);
                    resp.json(data);
                }
            })
        }
        else {
            console.log(payload)
            task.find({ "userId": payload.id }).distinct("backlogId").exec((err, backlogId) => {
                if (err) {
                    resp.json(err);
                }
                else {
                    console.log("BAcklog Id " + backlogId)
                    backlog.find({ "backlogId": backlogId }).distinct("projectId").exec((err, projectId) => {
                        if (err) {
                            resp.json(err);
                        }
                        else {
                            console.log("projectId " + projectId)
                            project.find({ id: projectId }).exec((err, data) => {
                                if (err) {
                                    resp.json(err);
                                }
                                else {
                                    console.log(data);
                                    resp.json(data);
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

exports.getProjectById = (req, resp) => {
    project.find({ 'id': req.params.id }, (err, data) => {
        if (err) {
            resp.json(err);
        }
        else {
            console.log(data);
            resp.json(data);
        }
    })
};

exports.addProject = (req, resp) => {
    util.isAuthorize(req, resp, (payload) => {
        if (payload.role === 'admin') {
            let Project = new project({
                managerId: req.body.managerId,
                id: req.body.id,
                name: req.body.name,
                team_member: req.body.team_member,
                scrum_master: req.body.scrum_master,
                status: req.body.status
            });

            Project.save((err, data) => {
                if (err) {
                    console.log(err)
                    resp.json("could not add project" + err)
                }
                else {
                    console.log(data);
                    resp.json("Project inserted successfully")
                }
            })
        }
    })

};


exports.updateProject = (req, resp) => {
    util.isAuthorize(req, resp, (payload) => {
        if (payload.role === 'admin') {
            project.findOneAndUpdate({ 'id': req.params.id },
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
                        resp.json("Project updated")
                    }
                })
        }
    })

};

exports.deleteProject = (req, resp) => {
    util.isAuthorize(req, resp, (payload) => {
        if (payload.role === 'admin') {
            project.findOneAndDelete({ 'id': req.params.id }, (err, data) => {
                if (err) {
                    console.log(err)
                    resp.json("could not delete" + err)
                }
                else {
                    console.log(data);
                    resp.json("Project deleted")
                }
            })
        }
    })

}

exports.getProjectByManagerId = (req, resp) => {
    project.find({ 'managerId': req.params.id }, (err, data) => {
        if (err) {
            resp.json(err);
        }
        else {
            console.log(data);
            resp.json(data);
        }
    })
}

exports.getProjectBybacklogId = (req, resp) => {
    project.find({ 'backlogId': req.params.id }, (err, data) => {
        if (err) {
            resp.json(err);
        }
        else {
            console.log(data);
            resp.json(data);
        }
    })
}

exports.getProjectByUserId = (req, resp) => {
    console.log(req.params.id)
    task.find({ "userId": req.params.id }).distinct("backlogId").exec((err, backlogId) => {
        if (err) {
            resp.json(err);
        }
        else {
            console.log('else-1')
            console.log("Backlog Id " + backlogId)
            backlog.find({ "backlogId": backlogId }).distinct("projectId").exec((err, projectId) => {
                if (err) {
                    resp.json(err);
                }
                else {
                    console.log('else-2')
                    console.log("projectId " + projectId)
                    project.find({ id: projectId }).exec((err, data) => {
                        if (err) {
                            resp.json(err);
                        }
                        else {
                            console.log(data);
                            resp.json(data);
                        }
                    })
                }
            })
        }
    })
}



var backlog = require('../model/backlog')
var util = require('../util/jwtUtil');

exports.getBacklogs = (req, resp) => {
    backlog.find({}).sort({ "created_at": 1 }).exec(
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

exports.getBacklogById = (req, resp) => {
    backlog.find({ 'backlogId': req.params.id }, (err, data) => {
        if (err) {
            resp.json(err);
        }
        else {
            console.log(data);
            resp.json(data);
        }
    })
};

exports.addBacklog = (req, resp) => {
    util.isAuthorize(req, resp, (payload) => {
        if (payload.role === 'admin') {
            let Backlog = new backlog({
                projectId: req.body.projectId,
                backlogId: req.body.backlogId,
                title: req.body.title,
                requirement: req.body.requirement,
                created_at: req.body.created_at,
                updated_at: req.body.updated_at
            })
            Backlog.save((err, data) => {
                if (err) {
                    console.log(err)
                    resp.json("could not add Backlog" + err)
                }
                else {
                    console.log(data);
                    resp.json("Backlog inserted successfully")
                }
            })
        }
    })

};


exports.updateBacklog = (req, res) => {
    util.isAuthorize(req, res, (payload) => {
        if (payload.role === 'admin') {
            backlog.findOneAndUpdate({ 'backlogId': req.params.id },
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
                        res.json("could not update" + err)
                    }
                    else {
                        console.log(data);
                        res.json("Backlog updated")
                    }
                })
        }
    })
}

exports.getBacklogsByProjectId = (req, res) => {
    backlog.find({ 'projectId': req.params.id }, (err, data) => {
        if (err) {
            console.log(err)
            res.json("could not get backlog" + err)
        }
        else {
            console.log(data);
            res.json(data)
        }
    })
}



exports.deleteBacklog = (req, resp) => {
    util.isAuthorize(req, resp, (payload) => {
        if (payload.role === 'admin') {
            backlog.findOneAndDelete({ 'backlogId': req.params.id }, (err, data) => {
                if (err) {
                    console.log(err)
                    resp.json("could not delete" + err)
                }
                else {
                    console.log(data);
                    resp.json("Backlog deleted")
                }
            })
        }
    })

    // exports.getTasksUsingProjectId=(req, res)=>{
    //     util.isAuthorize(req, res, (payload)=>{
    //         if(payload.role==='admin'){
    //             backlog.find({}, ())
    //         }
    //     })
    // }

}
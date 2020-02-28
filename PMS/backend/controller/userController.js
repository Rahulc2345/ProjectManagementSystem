var user = require('../model/User');
var jwt = require('jsonwebtoken');
var secret = "this_is_my_sercet_key";
var util = require('../util/jwtUtil')
var matcher = require('../util/passwordMatcher')
const jwtExpirySeconds = 300


exports.getUsers = (req, resp) => {
    user.find({}, (err, data) => {
        if (err) {
            console.log(err)
            resp.json("could not get users" + err)
        }
        else {
            console.log(data);
            resp.json(data);
        }
    });
};

exports.getUserById = (req, resp) => {
    user.find({ 'id': req.params.id }, (err, data) => {
        if (err) {
            resp.json(err);
        }
        else {
            resp.json(data);

        }
    })
};

exports.registerUser = (req, resp) => {
    let encypt = matcher.encryptPassword(req.body.password);
    //console.log(encypt);
    let User = new user({
        projectId: req.body.projectId,
        id: req.body.id,
        name: req.body.name,
        mobile_number: req.body.mobile_number,
        email: req.body.email,
        username: req.body.username,
        password: encypt,
        role: req.body.role,
        status: req.body.status
    });

    User.save((err, data) => {
        if (err) {
            console.log(err)

            if (JSON.stringify(err.keyPattern.id)) {
                resp.status(400).json("Could not add User: Duplicate Id")
            }
            else if (JSON.stringify(err.keyPattern.username)) {
                resp.status(400).json("Could not add User: Username already taken")
            }
            else if (JSON.stringify(err.keyPattern.email)) {
                resp.status(400).json("Could not add User: Email already exist")
            }
            else {
                resp.status(400).json("Something went wrong " + err)
            }
        }
        else {
            console.log(data);
            resp.json("User inserted successfully")
        }
    })
};

exports.login = (req, resp) => {
    user.findOne({ 'username': req.body.username }, (err, data) => {
        console.log(err)
        console.log(data)
        if (data == null) {
            resp.status(400).json("Invalid Username or Password")
        } else {
            let isValidPassword = matcher.matchPassword(req.body.password, data.password)
            if (isValidPassword) {
                if (err) {
                    resp.send(400).json({
                        success: false,
                        message: 'Authentication failed! Please check the request'
                    });
                }
                else {
                    let token = jwt.sign({ username: data.username, role: data.role, id: data.id },
                        secret,
                        {
                            expiresIn: '24h'
                        }
                    );
                    console.log(token)
                    // resp.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 })    //for cookie based authorization, comment the line for token-based
                    resp.json({
                        success: true,
                        message: 'Authentication successful!',
                        token: token,
                        role: data.role,
                        id: data.id
                    });
                }
            } else {
                resp.status(400).json("Invalid Username or Password")
            }
        }

    });
};


exports.updateUser = (req, resp) => {
    var encypt = matcher.encryptPassword(req.body.password);
    // console.log(encypt);
    user.findOneAndUpdate({ 'id': req.params.id },
        {
            //$set: req.body
            $set: {
                name: req.body.name,
                mobile_number: req.body.mobile_number,
                email: req.body.email,
                username: req.body.username,
                password: encypt,
            }
        }, (err, data) => {
            if (err) {
                console.log(err)
                resp.json("could not update users" + err)
            }
            else {
                console.log(data);
                resp.json("User updated")
            }
        })
};

exports.deleteUser = (req, resp) => {
    user.findOneAndDelete({ 'id': req.params.id }, (err, data) => {
        if (err) {
            console.log(err)
            resp.json("could not delete users" + err)
        }
        else {
            console.log(data);
            resp.json("User deleted")
        }
    })
}

exports.getUsersByProjectId = (req, resp) => {
    user.find({ 'projectId': req.params.id }, (err, data) => {
        if (err) {
            console.log(err)
            resp.json("could not get users" + err)
        }
        else {
            console.log("Users: " + data);
            resp.json(data)
        }
    })
}

exports.setProject = (req, resp) => {
    user.findOneAndUpdate({ 'id': req.params.id },
        {
            $set: {
                projectId: req.body.projectId
            }
        }, (err, data) => {
            if (err) {
                console.log(err)
                resp.json("could not update" + err)
            }
            else {
                console.log(data);
                resp.json("Project has been assigned to user")
            }
        })
}




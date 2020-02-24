const jwt = require('jsonwebtoken')

const jwtKey = 'this_is_my_sercet_key'
const jwtExpirySeconds = 300


// exports.refresh = (req, res) => {
//     // (BEGIN) The code uptil this point is the same as the first part of the `welcome` route
//     const token = req.cookies.token

//     if (!token) {
//         return res.status(401).end()
//     }

//     var payload
//     try {
//         payload = jwt.verify(token, jwtKey)
//     } catch (e) {
//         if (e instanceof jwt.JsonWebTokenError) {
//             return res.status(401).end()
//         }
//         return res.status(400).end()
//     }
//     // (END) The code uptil this point is the same as the first part of the `welcome` route

//     // We ensure that a new token is not issued until enough time has elapsed
//     // In this case, a new token will only be issued if the old token is within
//     // 30 seconds of expiry. Otherwise, return a bad request status
//     const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
//     if (payload.exp - nowUnixSeconds > 30) {
//         return res.status(400).end()
//     }

//     // Now, create a new token for the current user, with a renewed expiration time
//     const newToken = jwt.sign({ username: payload.username }, jwtKey, {
//         algorithm: 'HS256',
//         expiresIn: jwtExpirySeconds
//     })

//     // Set the new token as the users `token` cookie
//     res.cookie('token', newToken, { maxAge: jwtExpirySeconds * 1000 })
//     res.end()
// }

exports.isAuthorize = (req, resp, next) => {
    //const token=req.cookies.token;                      // for cookie based authorization
    let token = req.headers.authorization;           // for header based authorization
    console.log("Token " + token);
    var payload;

    if (!token) {
        return resp.status(401).end();
    }

    try {

        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        payload = jwt.verify(token, jwtKey);
        console.log(1111111111)
        console.log( payload)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            resp.status(401).end();
        }
        return resp.status(400).end();
    }
    next(payload);
}

exports.checkToken = (req, res, next) => {
    //const token = req.cookies.token                                                 //for cookie based authorization
    var token = req.headers['x-access-token'] || req.headers['authorization'];  // for header based authorization
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, jwtKey, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};
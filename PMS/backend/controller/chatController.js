var chat = require('../model/chat')
const Cryptr = require('cryptr');
const cryptr = new Cryptr('thisIsASecretKeyForEncryption');

exports.getChat = (req, resp) => {
    chat.find({}, (err, data) => {
        if (err) {
            resp.json(err)
        }
        else {
            resp.json(data)
        }
    })
    // .populate('from').populate('to')
}


var messagesByFirstUser = [];
var messagesBySecondUser = [];
var messages = [];
exports.getChatById = (req, resp) => {
    var decryptedMessag = '';
    uniqueId = req.params.fromId + req.params.toId
    console.log("uniqueId 1")
    console.log(uniqueId)
    chat.find({ from: req.params.fromId, to: req.params.toId, groupId: uniqueId }, (err, data) => {
        if (err) {
            resp.json(err)
        }
        else {
            console.log(1111)
            console.log(data)
            messagesByFirstUser = data
            uniqueId = req.params.toId + req.params.fromId
            console.log("uniqueId 2")
            console.log(uniqueId)
            chat.find({ from: req.params.toId, to: req.params.fromId, groupId: uniqueId }, (err, data) => {
                if (err) {
                    resp.json(err)
                }
                else {
                    //console.log(data)
                    messagesBySecondUser = data
                    //resp.json(data)
                    var messages = messagesByFirstUser.concat(messagesBySecondUser)
                    console.log(messages)
                    var message = messages.sort((a, b) => {
                        return a.timestamp.localeCompare(b.timestamp)
                    })
                    for (var i = 0; i < message.length; i++) {
                        decryptedMessage = cryptr.decrypt(message[i].message)
                        message[i].message = decryptedMessage;
                    }
                    console.log(message)
                    resp.json(message)
                }
            })
        }
    })
}

exports.insertChat = (req, resp) => {
    let Chat = new chat({
        //userIds: req.body.userIds,
        from: req.body.from,
        to: req.body.to,
        message: req.body.message,
        timestamp: req.body.timestamp,
        group: req.body.group
    });

    Chat.save((err, data) => {
        if (err) {
            console.log(err)
            resp.json("could not add chat" + err)
        }
        else {
            console.log(data);
            resp.json("chat inserted successfully")
        }
    })
}


exports.getChatByGroup = (req, resp) => {
    var decryptedMessag = '';
    chat.find({ groupId: req.params.id }, (err, data) => {
        if (err) {
            resp.json(err)
        }
        else {
            console.log(222222)
            console.log(data)
            var message = data.sort((a, b) => {
                return a.timestamp.localeCompare(b.timestamp)
            })
            //const desryptedMessage = cryptr.decrypt(data.message)
            for (var i = 0; i < message.length; i++) {
                decryptedMessage = cryptr.decrypt(message[i].message)
                message[i].message = decryptedMessage;
            }
            console.log(message)
            resp.json(message)
        }
    })
}



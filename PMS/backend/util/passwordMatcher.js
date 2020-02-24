const bcrypt=require('bcryptjs')

exports.matchPassword=(candidatePassword, databasePassword)=>{
    var result=bcrypt.compareSync(candidatePassword, databasePassword);
    console.log("Result: "+ result)
    return result;
}

exports.encryptPassword=(password)=>{
    return bcrypt.hashSync(password, 10);
}


// bcrypt.hash(user.password,10).then((hashedPassword) => {
//         user.password = hashedPassword;
//         next();
//     })
// }, function (err) {
//     next(err)
// })
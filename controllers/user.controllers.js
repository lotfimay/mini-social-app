const userService = require('../services/user.service');


exports.getUsers = async function(){
    try{
        const users = await userService.getUsers();
        return res.json(users);
    }catch(err){
        return res.status(500).json({'message' : 'something went wrong'});
    }
}

exports.geUser = async function(req , res , next){
    try{
       const userId = req.params.id;
       const user = await userService.geUser(userId);
       return res.json(user);
    }catch(err){
        return res.status(500).json({'message' : 'something went wrong'});
    }
}

exports.createUser = async function(req , res , next){
    try{
        const {userName , email} = req.body;
        const newUser = await userService.createUser(userName , email);
        return res.json(newUser);
    }catch(err){
        return res.status(500).json({'message' : 'something went wrong'});
    }
}
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.getUsers = async function(){
    
    try{
        const users = await prisma.user.findMany({
           select : {
             userId : true,
             userName : true,
             email : true,
           }
        });
        return users;
    }catch(err){
        console.log(err);
        throw err;
    }
}

exports.geUser = async function(userId){
    try{
        const user = await prisma.user.findUnique({
            where : {
                userId : userId,
            }
        });
        return user;
    }catch(err){
        console.log(err);
        throw err;
    }
}

exports.createUser = async function(userName , email){
    try{
        const newUser = await prisma.user.create({
            data: {
                userName : userName,
                email : email,
            }
        });

        return newUser;

    }catch(err){
        console.log(err);
        throw err;
    }
}
const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();




router.get('/' , async(req , res) => {
   try{
    const users = await prisma.user.findMany();
    return res.json(users);
   }catch(err){
        console.log(err);
        return res.status(500).json({'message' : 'something went wrong'})
   }

});

router.get('/:id' , async(req , res) =>{
    try{
        const user = await prisma.user.findUnique({
            where :{
                user_id : req.params.id,
            }
        });
        return res.json(user);
    }catch(err){
        console.log(err);
        return res.json({'message': 'something went wrong'})
    }
});

router.post('/' , async(req , res) => {
    try{
        const {user_name , email} = req.body;
        const newUser = await prisma.user.create({
            data : {
                user_name : user_name,
                email : email,
            }
        });
        return res.json(newUser);

    }catch(err){
        console.log(err);
        return res.json({'message' : 'Something went wrong' })
    }
});

module.exports = router;
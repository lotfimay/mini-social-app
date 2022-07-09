const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();




router.get('/' , async(req , res) =>{

    try{
        const communities = await prisma.community.findMany();
        return res.json(communities);

    }catch(err){
        console.log(err);
        return res.status(500).json({'message' : 'something went wrong'});

    }

});

router.get('/:id' , async(req , res) =>{

    try{
       const community = await prisma.community.findUnique({
        where : {
            communityId : req.params.id,
        },
       });
       return res.json(community);
    }catch(err){
        console.log(err);
        return res.status(500).json({'message' : 'something went wrong'});
    }

});


router.post('/' , async(req , res) =>{
    try{
        const {communityName , isPrivate , creatorId } = req.body;
        let newCommunity = await prisma.community.create({
            data : {
                communityName : communityName,
                isPrivate : isPrivate,
                creatorId : creatorId,
            }
        });
        return res.json(newCommunity);
    }catch(err){
        console.log(err);
        res.status(500).json({'message' : 'something went wrong'})
    }
} )



module.exports = router;

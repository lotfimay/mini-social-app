const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.getCommunities = async function(){
    try{

        const communities  = await prisma.community.findMany();
        return communities;

    }catch(err){
        console.log(err);
        throw err;
    }
}

exports.getCommunity = async function(communityId){
    try{

        const community = await prisma.community.findUnique({
            where : {
                communityId : communityId,
            }
        });
        return community;
    }catch(err){
        console.log(err);
        throw err;
    }
}

exports.createCommunity = async function(creator , communityName , category , isPrivate){

    try{
        const newCommunity = await prisma.community.create({
            data : {
                creatorId : creator,
                communityName : communityName,
                categoryId : category,
                isPrivate : isPrivate
            }
        });
        return newCommunity;
    }catch(err){
        console.log(err);
        throw err;
    }
}
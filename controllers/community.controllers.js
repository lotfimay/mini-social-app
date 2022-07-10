const communityService = require('../services/community.service');


exports.getCommunities = async function(req , res , next){

    try{

        const communities = await communityService.getCommunities();
        return res.json(communities);

    }catch(err){
        return res.status(500).json({'message' : 'something went wrong'});
    }


};

exports.getCommunity = async function(req , res ,next){

    try{
        const communityId = req.params.id;
        const community = await communityService.getCommunity(communityId);
        return community;
    }catch(err){
        return res.status(500).json({'message' : 'something went wrong'});
    }


};

exports.createCommunity = async function(req , res , next){

    try{
        const {creator , communityName , category , isPrivate} = req.body;
        const newCommunity = await communityService.createCommunity(creator , communityName ,category , isPrivate);
        return res.json(newCommunity);
    }catch(err){
        return res.status(500).json({'message' : 'something went wrong'});
    }

}
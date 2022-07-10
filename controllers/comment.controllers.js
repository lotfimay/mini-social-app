const commentService = require('../services/comment.service');


exports.getComments = async function(req , res , next){
    try{
        const {inculeReplies = false} = req.query;
        const postId = req.params.postId;
        const comments = await commentService.getComments(postId , inculeReplies);
        return res.json(comments);        
    }catch(err){
        return res.status(500).json({'message' : 'something went wrong'});
    }
}

exports.getComment = async function(req , res , next){
    try{
        const commentId = req.params.id;
        const {inculeReplies = false} = req.query;
        const comment = commentService.getComment(commentId , inculeReplies);
        return comment;
    }catch(err){
        return res.status(500).json({'message' : 'something went wrong'});
    }
}

exports.createComment = async function(req , res , next){
    try{
        const {postId , userId  , content , replyTo} = req.body;
        const newComment = await commentService.createComment(postId , userId , content , replyTo);
        return res.json(newComment);
        
    }catch(err){
        return res.status(500).json({'message' : 'something went wrong'});
    }
}

exports.deleteComment = async function(req , res , next){
    try{
        const commentId = req.params.id;
        const deletedComment = await commentService.deleteComment(commentId);
        return res.json(deletedComment);
    }catch(err){
        return res.status(500).json({'message' : 'something went wrong'});
    }
}

exports.updateComment = async function(req , res , next){
    try{
      const commentId = req.params.id;
      const {content} = req.body;
      const updatedComment = await commentService.updateComment(commentId , content);
      return res.json(updatedComment);
        
    }catch(err){
        return res.status(500).json({'message' : 'something went wrong'});
    }
}

exports.reactOnComment = async function(req , res , next){
    try{
       const commentId = req.params.id;
       const {userId , isLike} = req.body;
       const newReaction = await commentService.reactOnComment(commentId , userId , isLike);
       return res.json(newReaction); 
    }catch(err){
        return res.status(500).json({'message' : 'something went wrong'});
    }
}



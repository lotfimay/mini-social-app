const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const helper = require('../helpers/index');


exports.getComments = async function(postId , includeReplies){
    
    try{
      let comments = await prisma.comment.findMany({
        where : {
            postId : postId,
        },
      });
      if(comments && includeReplies) comments = helper.commentsFormatter(comments);
      return comments;

    }catch(err){
        console.log(err);
        throw err;
    }
}

exports.getComment = async function(commentId , includeReplies){

    try{
        let comment = await prisma.comment.findUnique({
            where : {
                commentId : commentId,
            },
        });
        if(comment && includeReplies){
            const comments = await prisma.comment.findMany({
                where : {
                    postId : comment.postId,                }
            });
           comment =  helper.commentFormatter(comment , comments);
        }
        return comment;
    }catch(err){
        console.log(err);
        throw err;
    }
}

exports.createComment = async function(postId , userId , content , replyTo){
        try{
            const newComment = await prisma.comment.create({
                data : {
                    postId : postId,
                    userId : userId,
                    content : content,
                    replyTo : replyTo,
                    likesNumber : 0,
                    disLikesNumber : 0,
                }
            });
            return newComment;
        }catch(err){   
            console.log(err);
            throw err;
        }

}

exports.deleteComment = async function(commentId){
    try{
        const deletedComment = await prisma.comment.delete({
            where : {
                commentId : commentId,
            }
        });
        return deletedComment;
    }catch(err){
        console.log(err);
        throw err;
    }
}

exports.updateComment = async function(commentId , content){
        try{
            if(content === '') throw Error('You can\'t insert an empty comment');
            const updatedComment = await prisma.comment.update({
                where : {
                    commentId : commentId,
                },
                data : {
                    content : content
                } 
            });
            return updatedComment;
        }catch(err){
            console.log(err);
            throw err;
        }
}

exports.reactOnComment = async function(commentId , userId , isLike){
    try{
        const newCommentReaction = await prisma.commentReactions.create({
            data :{
                commentId : commentId,
                userId : userId,
                isLike : isLike
            }
        });
        return newCommentReaction;
    }catch(err){
        console.log(err);
        throw err;
    }
};

exports.deleteReaction = async function(commentId , userId){
    try{
        const deletedCommentReaction = await prisma.commentReactions.delete({
            where : {
                commentId_userId:{
                    commentId : commentId,
                    userId : userId,
                }
            }
        });
        return deletedCommentReaction;
    }catch(err){
        console.log(err);
        throw err;
    }
}

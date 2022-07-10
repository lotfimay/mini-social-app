const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const helper = require('../helpers/index');





exports.getPosts = async function (){
    try{
        const posts = await prisma.post.findMany(
         {
             include : {
                 community :{
                     select : {
                         communityName : true,
                     }
                 },
                 author : {
                     select :{
                         userName : true,
                     }
                 }
             }
         }
        );
        return posts;
     }catch(err){
         console.log(err);
         throw err;
     }

}

exports.getPost = async function(postId){
    try{
        const post = await prisma.post.findUnique({
            where : {
                postId : postId,
            },
            include : {
                author : {
                    select : {
                        userName : true,
                    }
                },
                comments : true,
                community : {
                    select : {
                        communityName : true,
                    }
                }
            },
        });
        if(post !== null && post.comments !== null) post.comments = helper.commentsFormatter(post.comments);
        return post;
        
    }catch(err){
        console.log(err);
        throw err;
    }
}

exports.createPost = async function(author , title , content , communityId = null){

    try{
        const newPost = await prisma.post.create({
            data : {
                postTitle : title,
                postContent : content,
                authorId : author,
                communityId : communityId,
                likesNumber : 0,
                disLikesNumber : 0,
            }
        });
        return newPost;
    }catch(err){
        console.log(err);
        throw err;
    }

}

exports.deletePost = async function(postId){

    try{
        const deletedPost = await prisma.post.delete({
            where : {
                postId : postId,
            }
        });
        return deletedPost;
    }catch(err){
        console.log(err);
        throw err;
    }

}

exports.updatePost = async function (postId , title = null , content = null){

    try{
        const post = await prisma.post.findUnique({
            where : {
                postId : postId,
            }
        });
        if(post == null) return res.status(404).json({'message' : 'post not found'});
        let flag1 = false  , flag2 = false;

        title !== null ? flag1 = true : flag1 = false;
        content !== null ? flag2 = true : flag2 = false;

      
        if(flag1 && flag2){
          const updatedPost = await prisma.post.update({
              data : {
                  postTitle : title,
                  postContent : content
              },
              where : {
                  postId : req.params.id,
              }
          });
          return updatedPost;
        }
        else if(flag1){
          const updatedPost = await prisma.post.update({
              data :{
                  postTitle : title,
              },
              where : {
                  postId : req.params.id,
              }
          });
          return updatedPost;
        }
        else if(flag2){
           const updatedPost = await prisma.post.update({
              data : {
                  postContent : content,
              },
              where : {
                  postId : req.params.id
              }
           });
           return updatedPost
        }
        throw Error('Something went wrong !')
    }catch(e){
        console.log(e);
        throw e;
    }


}

exports.reactOnPost = async function(postId , userId , isLike){

    try{
        const newReaction = await prisma.reaction.create({
            data : {
                postId : postId,
                userId : userId,
                isLike : isLike,
            }
        });
        return newReaction;

    }catch(err){
        console.log(err);
        throw err;
    }


}

exports.deleteReaction = async function (postId , userId){

    try{
        const deletedReaction = await prisma.reaction.delete({
            where : {
                postId_userId : {
                    postId : postId,
                    userId : userId,
                }
            }
        });
        return deletedReaction;
    }catch(err){
        console.log(err);
        throw err;
    }

}

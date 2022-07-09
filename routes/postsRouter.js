const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();





router.get('/' , async(req , res) => {
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
       res.json(posts);
    }catch(err){
        console.log(err);
        res.status(500).json({'message' : 'something went wrong'});
    }
});


router.get('/:id' , async(req , res) =>{
    try{
        const post = await prisma.post.findUnique({
            where : {
                postId : req.params.id,
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
        /*
          later : try to reduce the complexity if it possible 
        */
         if(post !== null && post.comments !== null){
            post.comments.forEach((comment) => {
             let replies = [];
             post.comments.forEach((reply) => {
                 if(reply.replyTo === comment.commentId){
                    replies.push(reply);
                 }
             });
             comment.replies = replies;
         });
            post.comments =  post.comments.filter((comment) => comment.replyTo === null);
         }
        return res.json(post);
    }catch(err){
        console.log(err);
        return res.status(500).json({'message'  : 'something went wrong'});
    }
});


router.post('/' , async(req , res)  => {

    try{
       const { author ,title , content , communityId = null} = req.body;
       console.log(req.body);
       console.log(title , content);
       const newPost = await prisma.post.create({
           data : {
               postTitle : title,
               postContent : content,
               authorId : author,
               communityId : communityId,
           }
       });
       return res.json(newPost);

    }catch(err){
       console.log(err);
       res.status(500).json({'message' : 'something went wrong'});
   }
});

router.delete('/:id' , async(req , res) =>{
    try{
        const deletedPost = await prisma.post.delete({
            where : {
                postId : req.params.id,
            }
        });
        return res.status(200).json({'message' : 'post deleted successfully'});  
    }catch(e){
        console.log(e);
        return res.status(500).json({'message' : 'something went wrong'});
    }
});

router.patch('/:id' , getPost ,async(req , res) =>{

      const {title , content} = req.body;
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
        return res.json(updatedPost)
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
        return res.json(updatedPost);
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
         return res.json(updatedPost);
      }
    
      return res.status(500).json({
        'message' : 'something went wrong'
      });

});



router.post('/:postId/comments' , async(req , res) =>{

    try{
        const postId = req.params.postId;
        const {content , userId , replyTo} = req.body;
        const newComment = await prisma.comment.create({
            data : {
                content : content,
                userId : userId,
                postId : postId,
                replyTo : replyTo,
            }
        });
        return res.json(newComment);
    }catch(err){
         console.log(err);
         return res.status(500).json({
            'message' : 'Something went wrong !'
         });
    }
});


router.delete('/comments/:id' , async(req , res) =>{
   try{
      const deletedComment = await prisma.comment.delete({
        where :{
            commentId : req.params.id,
        }
      });
      res.json({'message' : 'deleted successfully'});
   }catch(err){
      console.log(err);
      res.status(500).json({'message' : 'something went wrong'});
   }
});



async function  getPost(req , res , next) {

    try{
        const post = await prisma.post.findUnique({
            where : {
                postId : req.params.id,
            }
        });
        if(post == null) return res.status(404).json({'message' : 'post not found'});
        res.post = post;
        next();
    }catch(err){
        console.log(err);
        return res.status(500).json({'message' : 'something went wrong'})
    }
}






module.exports = router;
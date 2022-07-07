const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.get('/' , async(req , res) => {
    try{
       const posts = await prisma.post.findMany();
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
                post_id : req.params.id,
            },
            include : {
                author : {
                    select : {
                        user_name : true,
                        email : true,
                    }
                },
                comments : true,
            },
        });

         post.comments.forEach((comment) => {
             let replies = [];
             post.comments.forEach((reply) => {
                 if(reply.reply_to === comment.comment_id){
                    replies.push(reply);
                 }
             });
             comment.replies = replies;
         });
        post.comments =  post.comments.filter((comment) => comment.reply_to === null);
        return res.json(post);
    }catch(err){
        console.log(err);
        return res.status(500).json({'message'  : 'something went wrong'});
    }
});


router.post('/comments' , async(req , res) =>{

    try{
        const {content , user_id , post_id , reply_to} = req.body;
        const newComment = await prisma.comment.create({
            data : {
                content : content,
                user_id : user_id,
                post_id : post_id,
                reply_to : reply_to,
            }
        });
        return res.json(newComment);
    }catch(err){
         console.log(err);
         return res.status(500).json({
            'message' : 'Something went wrong !'
         });
    }
})



router.post('/' , async(req , res)  => {

    try{
       const { author ,title , content} = req.body;
       console.log(req.body);
       console.log(title , content);
       const newPost = await prisma.post.create({
           data : {
               post_title : title,
               post_content : content,
               author_id : author,
           }
       });
       return res.json(newPost);

    }catch(err){
       console.log(err);
       res.status(500).json({'message' : 'something went wrong'});
   }
});

module.exports = router;
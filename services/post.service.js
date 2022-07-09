const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();





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

exports.updatePost = async function (){

}

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

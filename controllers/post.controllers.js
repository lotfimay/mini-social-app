const postService = require('../services/post.service');



exports.getPosts = async function (req , res , next){
    try{
        const posts = await postService.getPosts();
        return res.json(posts);
    }catch(err){
        return res.status(500).json({'message' : 'something went wrong'});
    }
}

exports.getPost = async function (req , res , next){
    try{
      const postId = req.params.id;
      const post = await postService.getPost(postId);
      return res.json(post);
    }catch(err){
        return res.status(500).json({'message' : 'something went wrong'});
    }
}

exports.createPost = async function(req , res , next) {
    try{
        const { author ,title , content , communityId = null} = req.body;
        const newPost = await postService.createPost(author , title , content ,communityId);
        return res.json(newPost);
    }catch(err){
        return res.status(500).json({'message' : 'something went wrong'});
    }
}

exports.deletePost = async function(req , res , next){
    try{
        const postId = req.params.id;
        const deletedPost = await postService.deletePost(postId);
        return res.json({'message' : 'post deleted successfully'});
    }catch(err){
        return res.status(500).json({'message' : 'something went wrong'});
    }
}

exports.updatePost = async function(req , res , next){
    try{
        const postId = req.params.id;
        const {content = null , title = null} = req.body;
        const updatedPost = await postService.updatePost(postId  , content , title);
        return res.json(updatedPost);

    }catch(err){
        return res.status(500).json({'message' : 'something went wrong'});
    }
}

exports.reactOnPost = async function(req , res , next){
    try{
        const postId = req.params.id;
        const {userId , isLike} = req.body;
        const newReaction = await postService.reactOnPost(postId , userId , isLike);
        return res.json(newReaction);
    }catch(err){
        return res.status(500).json({'message' : 'something went wrong'});
    }
}

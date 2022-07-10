const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controllers');



router.get('/' , postController.getPosts);

router.get('/:id' , postController.getPost);

router.post('/' , postController.createPost);

router.delete('/:id' , postController.deletePost);

router.patch('/:id' ,postController.updatePost);

router.post('/:id/react' , postController.reactOnPost);








module.exports = router;
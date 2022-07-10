const express = require('express');
const router = express.Router();

const commentControllers = require('../controllers/comment.controllers');


router.get('/:postId' ,commentControllers.getComments);

router.get('/:postId/:id' , commentControllers.getComment);

router.post('/' , commentControllers.createComment);

router.delete('/:id' , commentControllers.deleteComment);

router.patch('/:id' , commentControllers.updateComment);

router.post('/:id/react' , commentControllers.reactOnComment);

router.delete('/:id/react/:userId' , commentControllers.deleteCommentReaction);


module.exports = router;
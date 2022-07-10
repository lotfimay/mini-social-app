/*
later : try to reduce the complexity if it possible ( current O(n) =n² )
*/
exports.commentsFormatter = function(comments){
    comments.forEach((comment) => {
        let replies = [];
        comments.forEach((reply) => {
            if(reply.replyTo == comment.commentId){
                replies.push(reply);
            }
            comment.replies = replies;
        });
    });
    return comments.filter((comment) => comment.replyTo === null);   
}

exports.commentFormatter = function(comment , comments){
    let replies = [];
    comments.forEach((reply) =>{
        if(reply.replyTo === comment.commentId){
            replies.push(reply);
        }
    });
    comment.replies = replies;
    return comment;
}
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');


const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');



const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(cors());



app.use('/api/users' , userRoutes);

app.use('/api/posts' , postRoutes);

app.use('/api/comments' , commentRoutes);


app.listen(PORT ,  () => {
    console.log(`Listening on port ${PORT}`);
})
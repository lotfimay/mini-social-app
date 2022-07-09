const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/usersRouter');
const postsRouter = require('./routes/postsRouter');



const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(cors());



app.use('/api/users' , usersRouter);

app.use('/api/posts' , postsRouter);


app.listen(PORT ,  () => {
    console.log(`Listening on port ${PORT}`);
})
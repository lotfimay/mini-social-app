const express = require('express');
const app = express();
const cors = require('cors');
const  { PrismaClient } =  require('@prisma/client');
const bodyParser = require('body-parser');
const prisma = new PrismaClient();
const usersRouter = require('./routers/usersRouter');
const postsRouter = require('./routers/postsRouter');



const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(cors());

app.get('/' , async(req ,res) =>{
    return res.json({
        'data' : 'test',
    })
});





app.use('/api/users' , usersRouter);

app.use('/api/posts' , postsRouter);


app.listen(PORT , () => {
    console.log(`Listening on port ${PORT}`);
})
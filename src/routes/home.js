const connectDB = require('../../DB/connect');
const entry = require('../../models/schema')
module.exports = (
    function(){
        const router = require('express').Router();
        const fs = require('fs');
        router.get('/', async (req,res)=>{
                await connectDB('mongodb+srv://parv:12341234@task-manager.kwcw1do.mongodb.net/test')
                console.log('db connected')
            const articles = await entry.find({})
            res.json(articles)
            // res.render('./home/home.ejs',{articles})
        })

        router.get('/post/:id',(req,res)=>{
            const articles = JSON.parse(fs.readFileSync('./src/model/article.json'));
            const article = articles.find(article=>article.articleId==req.params.id);
        
            res.render('./home/post.ejs',{article});
        })

        return router;
    }
)();
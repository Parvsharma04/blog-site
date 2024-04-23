const entry = require('../../models/schemaPOST')
module.exports = (
    function(){
        const router = require('express').Router();
        router.get('/', async (req,res)=>{
            const articles = await entry.find({})
            res.render('./home/home.ejs',{articles})
        })

        router.get('/post/:id', async (req, res) => {
            try {
                const article = await entry.findOne({ articleId: req.params.id });
                if (!article) {
                    return res.status(404).send('Article not found');
                }
                res.render('./home/post.ejs', { article });
            } catch (error) {
                console.error('Error fetching article:', error);
                res.status(500).send('Internal Server Error');
            }
        });
        

        return router;
    }
)();
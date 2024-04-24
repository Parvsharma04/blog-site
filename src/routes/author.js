module.exports=(
    function(){
        const router = require('express').Router();
        const entry = require('../../models/schemaPOST')
   
        router.get('/dashboard', async (req,res)=>{
            const articles = await entry.find({authorId: req.session.user.id});
            res.render('./author/dashboard.ejs',{user:req.session.user,articles})
        })

        return router;
    }
)();
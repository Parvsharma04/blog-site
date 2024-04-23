module.exports = (
    function () {
        const router = require('express').Router();
        const multer = require('multer');
        const path = require('path');
        const entry = require('../../models/schemaPOST')
        // const entry = require('../../models/schemaPOST')

        const storage = multer.diskStorage({
            destination: './public/images',
            filename: function (req, file, cb) {                
                cb(null, Date.now() + '-' + file.originalname);
            }
        });

        const upload = multer({
            storage: storage,
            fileFilter: function (req, file, cb) {                
                const extension = path.extname(file.originalname);              
                if (extension.toLowerCase() == '.jpg' || extension.toLowerCase() == '.jpeg' || extension.toLowerCase() == '.png') {
                    cb(null, true);
                }
                else {
                    cb(new Error('Invalid file type'))
                }
            }
        });
        router.get('/add', (req, res) => {
            res.render('./articles/add.ejs');
        })

        router.post('/add', upload.single('image'), async(req, res) => {                   
                const articles = await entry.find({})
                console.log(articles);
                const article = {
                    articleId: Date.now(),
                    title: req.body.title,
                    article: req.body.article,
                    image: req.file.filename,
                    date: new Date().toLocaleDateString(),
                    author: req.session.user.firstName+" "+req.session.user.lastName,
                    authorId: req.session.user.id
                }
                entry.create(article);
                res.render('./articles/add', { message: 'Record added sucessfully' })
            
        });

        router.get('/delete/:id',async (req,res)=>{
            try {
                const article = await entry.findOne({articleId:req.params.id});
            if(!article){
                res.json(JSON.stringify({message:'error'}));
            }
            else{
                await entry.findOneAndDelete({articleId: req.params.id})
                res.json(JSON.stringify({message:'ok'}));
            }    
            } catch (error) {
                console.log(error)
            }        
        })
        return router;
    }
)();


module.exports=(
    function(){
        const router = require('express').Router();
        const User = require('../../models/schemaUser');
        const posts = require('../../models/schemaPOST')

        router.get('/dashboard', async (req,res)=>{
             const article= await posts.find({});
             const users= await User.find({});
            res.render('./admin/dashboard.ejs',{user:req.session.user,article,users})
        })

        router.get('/addUser',(req,res)=>{
            res.render('./admin/adduser.ejs');
        })

        router.post('/addUser', async (req,res)=>{
            const existingUser = await User.find({username: req.body.username});
            if(existingUser.length > 0){
                res.send('User already exists');
            } else {
                const userObj = {
                    firstName:req.body.firstname,
                    lastName:req.body.lastname,
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    role:req.body.role
                }
                await User.create(userObj); // Make sure to await the creation process
                res.send('User Added Successfully');
            }
        });
        

        router.delete('/admin/deleteUser/:username', async (req, res) => { // corrected
            try {
                const user = await User.findOneAndDelete({ username: req.params.username }); // corrected
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                return res.json({ message: 'ok' });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Something went wrong' });
            }
        });
        
        return router;
    }
)();
const router = require('express').Router();
const User = require('../../models/schemaUser');

router.get('/login', (req, res) => {
    res.render('./login/login.ejs');
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.find({ username: req.body.username, password: req.body.pass });
        console.log(user)
        if (user.length) {
            req.session.user = user[0];
            if (user[0].role === 'admin') {
                return res.redirect('/admin/dashboard');
            } else if (user[0].role === 'author') {
                return res.redirect('/author/dashboard');
            }
        } else {
            return res.redirect('/signup');
        }
    } catch (error) {
        console.error('Error occurred during login:', error);
        return res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
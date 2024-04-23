const router = require('express').Router();
const User = require('../../models/schemaUser');

router.get('/login', (req, res) => {
    res.render('./login/login.ejs');
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username, password: req.body.pass });

        if (user) {
            req.session.user = user;
            if (user.role === 'admin') {
                return res.redirect('/admin/dashboard');
            } else if (user.role === 'author') {
                return res.redirect('/author/dashboard');
            }
        } else {
            return res.render('./login/login.ejs', { message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error occurred during login:', error);
        return res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
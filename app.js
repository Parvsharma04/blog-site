const express = require('express');
const app = express();
const session = require('express-session');
const loginRouter = require('./src/routes/login');
const authorRouter = require('./src/routes/author');
const adminRouter = require('./src/routes/admin');
const articleRouter = require('./src/routes/articles');
const homeRouter = require('./src/routes/home');
const connectDB = require('./DB/connect')
const signupRouter = require('./src/routes/signup')
connectDB()

app.listen(8080, ()=>{console.log(`http://localhost:8080`)});

app.set('view engine','ejs');
app.set('views','./src/views')

app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:'keyboard'
}));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('./public'))

app.use('/',loginRouter);
app.use('/',signupRouter);

const userAuth = (req,res,next)=>{

    if(req.session && req.session.user){
        next()
    }
    else{
        res.redirect('/');
    }
}

const adminAuth = (req,res,next)=>{
    if(req.session.user.role=='admin'){
        next();
    }
    else{
        res.send('Invalid access')
    }
}

const authorAuth = (req,res,next)=>{
    if(req.session.user.role=='author'){
        next();
    }
    else{
        res.send('Invalid access')
    }
}
app.use('/',homeRouter);
app.use('/admin',userAuth,adminAuth,adminRouter);
app.use('/author',userAuth,authorAuth,authorRouter)
app.use('/article',userAuth,articleRouter);

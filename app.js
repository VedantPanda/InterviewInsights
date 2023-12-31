const express = require('express');
const app = express();
const port = 3000;
const ejsMate = require('ejs-mate');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const experienceRoutes = require('./routes/experiences');
const userRoutes = require('./routes/users');
const commentRoutes = require('./routes/comments');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const flash = require('connect-flash');
const User = require('./models/users');
const ExpressError = require('./utils/ExpressError');

mongoose.connect('mongodb://127.0.0.1:27017/InterviewInsights',{
    useNewUrlParser:true,
    useUnifiedTopology:true
    //useCreateIndex:true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database Connected!");
})

app.engine('ejs',ejsMate);

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));

const configSession = {
    secret:"secret-key",
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now() + 1000*60*60*24*7,
        maxAge:1000*60*60*24*7
    }
}

app.use(session(configSession));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use("/insights",experienceRoutes);
app.use("/insights/user",userRoutes);
app.use("/insights/comments",commentRoutes);

//Used to throw error to the error handling middleware when a route is called which does not exist
app.all("*",(req,res,next)=>{
    next(new ExpressError("Page not found",404));
})

//Error Handling Middleware
app.use((err,req,res,next)=>{
    const{statusCode=500} = err;
    if(!err.message){
        err.message = "Something went wrong";
    }
    res.status(statusCode).render('errors',{err});
})

app.listen(port,()=>{
    console.log("Server Started!");
})
const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session')
const flash = require('connect-flash');
const ejs = require('ejs');

const ExpressError = require('./utils/ExpressError');

const methodOverride = require("method-override")

const userRoutes = require('./routes/users')
const campgroundRoutes = require('./routes/campground')
const reviewRoutes = require('./routes/reviews')
const passport = require('passport');
const LocalStrategy = require('passport-local')
const User = require('./models/user');
const passportConfig = require("./routes/passportConfig")
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp ')
// passportConfig.initilizingPassport(passport)
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection errors:"));
db.once("open", () =>{
    console.log("Database Connected");
});


const app = express();


app.engine('ejs', ejsMate);
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))
const sessionConfig = {
    secret: 'thisshouldbebettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }

}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use ((req, res, next) =>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error'); 
    next();
})



app.use('/', userRoutes)
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/reviews', reviewRoutes)

app.get('/',(req,res)=>{
    res.render('home')
    
})





app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) =>{
    const { statusCode = 500, } = err;
    if(!err.message) err.message = 'Oh No, Something Went Wrong'
    res.status(statusCode).render('error', {err});
    // res.status()
    // res.send('Oh boy, something went wrong')
})

app.listen(3000,()=>{
    console.log('Serving on port 3000');
})
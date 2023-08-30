
// const LocalStrategy = require('passport-local');
// const User = require('../models/user')
// exports.initializingPassport = (passport) => {
//     try {
//         passport.use(new LocalStrategy(async (username, password, done) => {
//             const user = await User.findOne({ username });

//             if (!user) return done(null, false)
//             if (user.password !== password) return done(null, false);
//             return done(null, user)
//         }))
//     }
//     catch(error){
//         return done(error, false);
//     } 
//     passport.serializeUser ((User, done) =>{
//         done(null, User.id)
//     })
//     passport.deserializeUser(async(id, done)=>{
//         try{
//             const user = await User.findById(id);
//             // done 
//         }
//         catch{

//         }
//     })
// }
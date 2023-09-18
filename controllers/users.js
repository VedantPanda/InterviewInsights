const User = require('../models/users');

module.exports.registration = (req,res)=>{
    res.render("user/register");
}

module.exports.resigterUser = async(req,res)=>{
    const {email,username,password} = req.body;
    const newUser = new User({email:email,username:username});
    await User.register(newUser,password);
    res.redirect("/insights/user/login");
}

module.exports.loginForm = (req,res)=>{
    res.render("user/login");
}

module.exports.loginUser = (req,res)=>{
    res.redirect("/insights/experiences");
}

module.exports.logoutUser = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/insights/user/login');
    });
}
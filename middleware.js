const InterviewExperience = require('./models/experiences');
const comments = require('./models/comments');

module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.flash('error','You must be logged in!');
        return res.redirect("/insights/user/login");
    }
    next();
}

module.exports.login = (req,res,next) => {
    if(req.isAuthenticated()){
        return res.redirect("/insights/experiences");
    }
    next();
}

module.exports.isAuthorized = async(req,res,next) => {
    const {id} = req.params;
    const experience = await InterviewExperience.findById(id);
    if(!experience){
        req.flash("error","Interview Experience does not exist");
        return res.redirect(`/insights/experiences`);
    }
    if(!experience.author.equals(req.user._id)){
        req.flash("error","You do not have permission to do that!");
        return res.redirect(`/insights/experiences/${id}`);
    }
    next();
}

module.exports.isCommentAuthorized = async(req,res,next) => {
    const {id} = req.params;
    const {commentId} = req.params;
    const comment = await comments.findById(commentId);
    if(!comment){
        req.flash("error","Comment does not exist");
        return res.redirect(`/insights/experiences/${id}`);
    }
    if(!comment.person.equals(req.user._id)){
        req.flash("error","You do not have permission to do that!");
        return res.redirect(`/insights/experiences/${id}`);
    }
    next();
}
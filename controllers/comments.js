const comments = require('../models/comments');
const InterviewExperience = require('../models/experiences');

module.exports.addComment = async(req,res)=>{
    const {comment} = req.body;
    const newComment = new comments({body:comment});
    newComment.person = req.user._id;
    await newComment.save();
    const {id} = req.params;
    const experience = await InterviewExperience.findById(id);
    experience.comments.push(newComment);
    await experience.save();
    req.flash('success','Comment added successfully');
    res.redirect(`/insights/experience/${id}`);
}

module.exports.deleteComment = async(req,res)=>{
    const {id} = req.params;
    const {commentId} = req.params;
    await InterviewExperience.findByIdAndUpdate(id,{$pull:{comments:commentId}});
    await comments.findByIdAndDelete(commentId);
    req.flash('success','Comment deleted successfully');
    res.redirect(`/insights/experience/${id}`);
}
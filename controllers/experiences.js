const InterviewExperience = require('../models/experiences');

module.exports.experiences = async (req,res)=>{
    const experiences = await InterviewExperience.find({});
    res.render("experiences",{experiences});
}

module.exports.myExperiences = async(req,res)=>{
    const myExperience = await InterviewExperience.find({author:req.user._id});
    res.render("myExperiences",{myExperience});
}

module.exports.addExperience = (req,res)=>{
    res.render("addExperience");
}

module.exports.editExperience = async(req,res)=>{
    const {id} = req.params;
    const experience = await InterviewExperience.findById(id);
    res.render("editExperience",{experience});
}

module.exports.postExperience = async (req,res)=>{
    const newExperience = new InterviewExperience(req.body.experience);
    newExperience.author = req.user._id;
    await newExperience.save();
    req.flash('success','Interview Experience added successfully');
    res.redirect("/insights/myExperiences");
}

module.exports.experienceDetails = async(req,res)=>{
    const {id} = req.params;
    const experience = await InterviewExperience.findById(id).populate(
        {
            path:'comments',
            populate:{
                path:'person'
            }
        }
    ).populate('author');
    if(!experience){
        req.flash("error","Cannot find experience");
        return res.redirect('/insights/experiences');
    }
    res.render("showExperience",{experience});
}

module.exports.deleteExperience = async(req,res)=>{
    const {id} = req.params;
    await InterviewExperience.findByIdAndDelete(id);
    req.flash('success','Interview Experience deleted successfully');
    res.redirect("/insights/experiences");
}

module.exports.updateExperience = async(req,res)=>{
    const {id} = req.params;
    const updatedExperience = await InterviewExperience.findByIdAndUpdate(id,req.body.experience,{new:true,runValidators:true});
    await updatedExperience.save();
    req.flash('success',"Successfully updated experience");
    res.redirect(`/insights/experience/${id}`);
}
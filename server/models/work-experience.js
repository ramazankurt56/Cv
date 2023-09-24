const workExperienceSchema=new Schema({
    _id:String,
    title:String,
    company:String,
    date:String,
    description:String
})

export default WorkExperience=mongoose.model("WorkExperience",workExperienceSchema);

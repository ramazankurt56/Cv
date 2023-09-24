const socialMediaSchema=new Schema({
    _id:String,
    title:String,
    link:String,
    icon:String
})
export default SocialMedia=mongoose.model("SocialMedia",socialMediaSchema);


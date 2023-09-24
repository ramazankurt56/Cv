const educationsSchema=new Schema({
    _id:String,
    title:String,
    section:String,
    date:String
})
export default Education=mongoose.model("Education",educationsSchema);


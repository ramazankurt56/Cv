const languageSchema=new Schema({
    _id:String,
    title:String
})
export default Language=mongoose.model("Language",languageSchema);
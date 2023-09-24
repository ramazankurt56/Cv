const skillSchema=new Schema({
    _id:String,
    title:
    {
        type:String,
        unique:true
    },
    rate:Number
})
export default Skill=mongoose.model("Skill",skillSchema);

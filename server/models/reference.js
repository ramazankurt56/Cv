const referenceSchema=new Schema({
    _id:String,
    name:String,
    position:String,
    number:String
})
export default Reference=mongoose.model("Reference",referenceSchema);

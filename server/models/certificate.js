const certificateSchema=new Schema({
    _id:String,
    title:String,
    date:String
})
export default Certificate=mongoose.model("Certificate",certificateSchema);

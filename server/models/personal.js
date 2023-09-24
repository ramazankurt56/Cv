
const personSchema=new Schema({
    name:String,
    title:String,
    phone:String,
    mail:String,
    address:String,
    dateOfBirth:Date,
    avatar:String,
    aboutMe:String,
})
export default Person=mongoose.model("Person",personSchema);


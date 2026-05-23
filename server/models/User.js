import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema=new mongoose.Schema({
    name: {
    type: String,
    required:[true,'Please provide a name'],
    trim:true
},
email: {
  type:String,
  required:[true,'Please provide an email'],
  unique:true,
  lowercase: true,
  match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please provide an valid email']

},
password:{
    type: String,
    required:[true,'Please provide a password'],
    minlength:6,
    select:false
},
createdAt:{
    type:Date,
    default:Date.now
},
UpdatedAt:{
    type:Date,
    default:Date.now
}
});

//Hash before saving
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.updatedAt=new Date();
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    return next();

});
//comparing passwords
userSchema.methods.matchedPassword=async function(enteredPasssword){
    return await bcrypt.compare(enteredPasssword,this.password);
};

userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model('User', userSchema);
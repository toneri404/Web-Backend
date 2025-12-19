import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name:{type: String,required: true},
    email:{type:String,required: true,unique: true,lowercase: true},
    age:{type:Number,required: true},

    password:{type:String,required: true,minlength: 6},

    address:{
        street:{type: String, trim: true},
        city:{type:String, trim: true},
        country:{type:String, trim: true},
    },

    role:{type: String, enum:["user","admin"],default: "user"},

    isActive:{type:Boolean, default:true},

    hobbies:[{type:String}],

    posts:[{type:mongoose.Schema.Types.ObjectId, ref:"Post"}],
},
{
    timestamps:true,
}
);

//pre-save middleware to hash password
userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,6);
    next();
});

//method to compare password during login
userSchema.method.comparePassword = async function (candidatePassword){
    return bcrypt.compare(candidatePassword,this.password);
};

export default mongoose.model("User",userSchema);

import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullname:{
        type:String,
        require:true,
        index:true,
        trim:true
    },
    avatar:{
        type:String,
        require:true
    },
    coverImge:{
        type:String
    },
    watchHistrory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        require:[true,'password is required']
    },
    refreshToken:{
        type:String
    }
},{
    timestamps:true
})
//password conver into encryption
userSchema.pre("save",async function(next){
    if(!this.Modified("password"))   return next();
    this.password = bcrypt.hash(this.password,10);
    next()
})
//check password 
userSchema.methods.isPasswordCorrect = async function 
(password) {
  return await bcrypt.compare(password,this.password)
}
//check AUth user
userSchema.methods.generatedAccessToken = function (){
  return  jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    }),
    process.env.ACCESS_TOKEN_SECREAT,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
}
userSchema.methods.generatedRefreshToken = function (){
    return  jwt.sign({
          _id:this._id
      }),
      process.env.REFRESH_TOKEN_SECREAT,{
          expiresIn:process.env.REFRESH_TOKEN_EXPIRY
      }
  }
export const User = mongoose.model("User",userSchema)
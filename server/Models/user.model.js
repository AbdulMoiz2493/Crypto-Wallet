import mongoose, { Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [/.+@.+\..+/, "Please provide a valid email address"]
    },

    password: {
      type: String,
      required: [true, "Password is Required"],
      minlength: [8, "Password must be at least 8 characters long"]
    },

    walletAddress: { type: String, required: true },
    privateKey: { type: String, required: true },
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
    
    refreshToken: {
      type: String,
    },

  },
  { timestamps: true }
);



// Exclude sensitive data from output
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.refreshToken;
  return user;
};



//Hashing the password before saving..
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});


//Checking password with the hash stored in the db.
userSchema.methods.isPasswordCorrect = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

//Generate access token..
userSchema.methods.generateAccessToken = function () {
    const access_token = jwt.sign({
        _id: this._id,
        role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    });

    return access_token;
}

//Generate Refresh Token..
userSchema.methods.generateRefreshToken = function () {
    const refresh_token = jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    });

    return refresh_token;
}


//Export the User model
export const User = mongoose.model("User", userSchema);

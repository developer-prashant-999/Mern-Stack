const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  messages: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
  ],
});

//we are hashing the password
userschema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hashSync(this.password, 12);
    this.cpassword = await bcrypt.hashSync(this.cpassword, 12);
  }
  next();
});

userschema.methods.generateAuthToken = async function () {
  try {
    let tokengen = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: tokengen });
    await this.save();
    return tokengen;
  } catch (error) {
    console.log(error);
  }
};

userschema.methods.addmessage = async function (name, email, phone, message) {
  try {
    this.messages = this.messages.concat({
      name,
      email,
      phone,
      message,
    });
    await this.save();
    return this.messages;
  } catch (error) {
    console.log(error);
  }
};
const User = mongoose.model("USER", userschema);
module.exports = User;

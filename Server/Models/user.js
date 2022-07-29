const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      required: false,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    role: {
      type: String,
      required: true,
      enum: ["student", "instructor", "admin"],
    },
    title: { type: String, required: false },
    unit: {
      type: Number,
      required: false,
      default: Math.floor(Math.random() * (6 - 1 + 1)) + 1,
    },
    marks: {
      type: {
        DSA: {
          type: Number,
          required: false,
          default: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
        },
        Coding: {
          type: Number,
          required: false,
          default: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
        },
        CSBT: {
          type: Number,
          required: false,
          default: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
        },
      },
      required: false,
      default: {
        DSA: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
        Coding: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
        CSBT: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const userModel = new model("user", userSchema);

module.exports = userModel;

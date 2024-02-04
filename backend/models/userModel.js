const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Name cannot exceed more than 30 characters"],
        minLength: [3, "Name should have more than 2 characters"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should have more than 8 characters"],
        select: false
    },
    runs: [
        {
            answers: {
                t1: {
                    q1: Boolean,
                    q2: Boolean
                },
                t2: {
                    q1: Boolean,
                    q2: Boolean,
                    q3: Boolean,
                    q4: Boolean,
                },
                t3: {
                    q1: Boolean,
                    q2: Boolean,
                    q3: Boolean,
                    q4: Boolean
                }
            },
            submittedAt: String,
            time_taken: String,
            score: Number,
            createdAt: {
                type: Date,
                default: new Date()
            }
        }
    ],
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

// JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model("User", userSchema) 
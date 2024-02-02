const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const sendToken = require("../utils/jwtToken");

//Register A User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, password } = req.body;

    let user = await User.findOne({ name: name })

    if (user) {
        return next(new ErrorHandler("User already exist with this name\n Choose different username or enter correct password", 404))
    }

    user = await User.create({
        name,
        password
    })

    const token = user.getJWTToken();

    sendToken(user, 201, res);
})


// Login A User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { name, password } = req.body;

    const user = await User.findOne({ name: name }).select("+password");

    if (!user)
        return next(new ErrorHandler("Invalid name or password", 401));

    const isPasswordMatched = user.comparePassword(password);

    if (!isPasswordMatched)
        return next(new ErrorHandler("Invalid name or password", 401));

    const token = user.getJWTToken();

    sendToken(user, 200, res);
})

// Logout User
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
})
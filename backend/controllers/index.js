const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const sendToken = require("../utils/jwtToken");

//Register A User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, password } = req.body;

    let user = await User.findOne({ name: name })

    if (user) {
        return next(new ErrorHandler("User already exist with this name", 404))
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

//Add A Run
exports.addRun = catchAsyncErrors(async (req, res, next) => {
    const { answers, time_taken, submittedAt, score, userId, createdAt } = req.body;
    const user = await User.findById(userId);

    const newRun = {
        answers,
        time_taken,
        score,
        submittedAt,
        createdAt
    };

    user.runs.push(newRun);

    await user.save();

    res.status(201).json({
        success: true,
        data: user.runs[user.runs.length - 1]
    });
})

exports.getRuns = catchAsyncErrors(async (req, res, next) => {
    const { userId } = req.query;
    const user = await User.findById(userId);

    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    let recentRuns = user.runs;
    recentRuns.sort((a, b) => b.createdAt - a.createdAt)

    res.status(200).json({
        success: true,
        runs: user.runs,
    });
})
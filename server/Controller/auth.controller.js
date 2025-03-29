import { cookieOption } from "../Constants/auth.constants.js";
import { User } from "../Models/user.model.js";
import { ErrorHandler } from "../Utils/ApiErrorHandler.js";
import { asyncHandler } from "../Utils/AsyncHandler.js";
import { ApiResponseHandler } from "../Utils/ApiResponseHandler.js";
import { generateAccessAndRefreshToken } from "../Utils/GenerateTokens.js";
import jwt from "jsonwebtoken";
import Web3 from "web3";


const web3 = new Web3(new Web3.providers.HttpProvider(`https://sepolia.infura.io/v3/e5ac44caaec14b85970cf43ffa77b999`));

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) throw new ErrorHandler(400, "User Already Exists");
  
    const account = web3.eth.accounts.create();
  
    const user = new User({
      name,
      email,
      password,
      walletAddress: account.address,
      privateKey: account.privateKey,
    });
  
    await user.save();
  
    return res
        .status(201)
        .json(new ApiResponseHandler(200, null, "User registered successfully."));
});



//Login User
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ErrorHandler(
            400,
            "Email and password are required. Please provide both."
        );
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
        throw new ErrorHandler(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ErrorHandler(400, "Incorrect email or password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select(
        "-privateKey"
    );

    return res
        .status(201)
        .cookie("accessToken", accessToken, cookieOption)
        .cookie("refreshToken", refreshToken, cookieOption)
        .json(
            new ApiResponseHandler(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged In Successfully"
            )
        );
});


//Logout User
export const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1, // this removes the field from document
            },
        },
        {
            new: true,
        }
    );

    res
        .status(200)
        .clearCookie("accessToken", cookieOption)
        .clearCookie("refreshToken", cookieOption)
        .json(new ApiResponseHandler(200, {}, "User logged out successfully."));
});




// TODO: Change this functionality for User Type - Admin;

export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req.cookies?.refreshToken || req.body?.refreshToken;
    const userType = req.body.userType;
    if (!incomingRefreshToken) {
        throw new ErrorHandler(401, "Unauthorized Request");
    }
    try {

        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
        let user;

        if (userType === "user" || userType === "admin") {
            user = await User.findById(decodedToken._id);
        } else {
            throw new ErrorHandler(401, "Unauthorized Request");
        }

        if (!user) {
            throw new Error(401, "Invalid Token Provided - Please login again");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ErrorHandler(401, "Refresh Token is Expired or used"); //Well , it is used at this point.
        }

        const accessToken = await user.generateAccessToken();

        return res
            .status(200)
            .cookie("accessToken", accessToken, cookieOption)
            .json(
                new ApiResponseHandler(
                    200,
                    {
                        accessToken,
                        refreshToken: user.refreshToken,
                    },
                    "Access Token Refreshed"
                )
            );
    } catch (err) {
        throw new ErrorHandler(401, err?.message || "Cannot refresh access Token")
    }
});


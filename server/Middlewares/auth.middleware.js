import { User } from "../Models/user.model.js";
import { ErrorHandler } from "../Utils/ApiErrorHandler.js";
import { asyncHandler } from "../Utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyUserJWT = asyncHandler(async (req, res, next) => {
    
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new ErrorHandler(401, "Unauthorized Request");
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!token) {
            throw new ErrorHandler(401, "Cannot verify the token");
        }

        const user = await User.findById(decodedToken._id);

        if (!user) {
            throw new ErrorHandler(401, "Invalid access token");
        }
        req.user = user;
        next();

    } catch (error) {
        throw new ErrorHandler(401, error?.message || "Invalid access token");
    }

});



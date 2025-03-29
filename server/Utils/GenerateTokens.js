import { User } from "../Models/user.model.js";
import { ErrorHandler } from "./ApiErrorHandler.js";


export const generateAccessAndRefreshToken = async (id) => {
    try {
        let user = await User.findById(id);
        if (!user) {
            console.log(err);
            throw new ErrorHandler(500, `user not found with id : ${id}`);
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })


        return { accessToken, refreshToken };

    } catch (err) {
        console.log(err)
        throw new ErrorHandler(500, "Something went wrong while generating refresh and access token");
    }

}
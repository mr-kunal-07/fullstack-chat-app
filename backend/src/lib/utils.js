import jwt from "jsonwebtoken"

export const generatwebtoken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevent xss attacks cross site scripting
        sameSite: "strict", // csrf attack cross site request forgery attack
        secure: process.env.NODE_ENV !== "development"
    })
    return token
}


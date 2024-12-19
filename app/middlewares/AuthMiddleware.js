import { TokenDecode } from "../utility/tokenUtility.js";

export default (req, res, next) => {
    try {
        
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ status: "fail", message: "Unauthorized: Token not found in cookies" });
        }

        const decoded = TokenDecode(token);
        console.log(token)

        if (!decoded) {
            return res.status(401).json({ status: "fail", message: "Unauthorized: Invalid token" });
        }

        
        req.headers.phoneNumber = decoded.phoneNumber;
        req.headers.user_id = decoded._id;

        next();
    } catch (err) {
        return res.status(401).json({ status: "fail", message: "Unauthorized: " + err.message });
    }
};


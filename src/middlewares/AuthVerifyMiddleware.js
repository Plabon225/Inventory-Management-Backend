import jwt from 'jsonwebtoken';
import {JWT_KEY} from "../config/config.js";

export default (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) return res.status(401).json({ status: "unauthorized" });
        const decoded = jwt.verify(token, JWT_KEY);
        req.user = decoded.data.email;
        next();
    } catch {
        res.status(401).json({ status: "unauthorized" });
    }
};

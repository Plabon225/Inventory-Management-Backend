import jwt from 'jsonwebtoken'
import {JWT_KEY, REQUEST_TIME} from "../src/config/config.js";

const createToken = (data)=>{
    let payload = {exp: Math.floor(Date.now() / 1000) + REQUEST_TIME, data: data}
    return jwt.sign(payload,JWT_KEY);
}
export default createToken;
import jwt from 'jsonwebtoken';

const userAuth = async (req,res,next) => {

     // ✅ Token nikal rahe ho cookies se
    const {token} = req.cookies;

     // ✅ Token agar nahi mila toh Unauthorized
    if(!token){
        return res.status(401).json({ success: false, msg: "⚠️ Access denied. Please login to continue.." });    }
        

        try {

            // ✅ Token verify kar rahe ho secret key se
            const decoded = jwt.verify(token,process.env.JWT_SECRET);

            // Attach userId directly to req for easy access
            req.body.userId = decoded.id;
            req.user = decoded;
            
            // ✅ Middleware ka kaam complete, next controller pe jao
            next(); // Continue to next middleware/controller
           
            
        } catch (error) {
            console.error('❌ Authentication Error:', error.message);
            return res.status(401).json({ success: false, msg: "🚨 Session expired or invalid token. Please login again." });
        }
        
}

export default userAuth;
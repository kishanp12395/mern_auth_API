import jwt from 'jsonwebtoken';

const userAuth = async (req,res,next) => {
    const {token} = req.cookies;
    if(!token){
        return res.status(401).json({ success: false, msg: "Unauthorized. login again." });    }
        
        try {
            
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            if(decoded.id){
                req.body.userId = decoded.id; // Attach userId to request
            }else{
                return res.status(401).json({ success: false, msg: "Unauthorized. login again." });    
            }
            next(); // Continue to next middleware/controller
           
            
        } catch (error) {
            return res.status(401).json({ success: false, msg: "Invalid or expired token" });
        }
        
}

export default userAuth;
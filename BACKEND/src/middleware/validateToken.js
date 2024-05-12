import jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    res
      .status(401)
      .json({ message: "no tienes un token. Autorizacion denegada" });

  jwt.verify(token, "keysecret1", (err, user) => {
    if (err) return res.status(403).json({ message: "invalid token" });
    
    req.user = user;

    next(); 
  });
};

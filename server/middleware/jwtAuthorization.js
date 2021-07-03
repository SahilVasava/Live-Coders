import jwt from "jsonwebtoken";

export default (req, res, next) => {
  try {
    const jwtToken = req.header("token");

    if (!jwtToken) {
      return res.status(403).json({
        message: "Unauthorized",
        success: false,
      });
    }

    const payload = jwt.verify(jwtToken, process.env.JWTSECRET);
    console.log(payload);
    req.user = payload.user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      message: "Unauthorized",
      success: false,
    });
  }
};

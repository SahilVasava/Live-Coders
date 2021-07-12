import jwt from "jsonwebtoken";

export const jwtGenerator = (user_id) => {
  const payload = {
    user: user_id,
  };
  const token = jwt.sign(payload, process.env.JWTSECRET, { expiresIn: "24h" });

  return { token, exp: jwt.decode(token).exp };
};

import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const createToken = async (
  payload: object,
  secret: string,
  expireTime: string
) : Promise<string | null> => {
  try {
    return jwt.sign(payload, secret, {
      expiresIn: expireTime,
    });
  }catch(error){
    return null;
  }
};

const verifyToken = async (token: string, secret: Secret) : Promise<string | JwtPayload | null> => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

export const jwtHelpers = { verifyToken , createToken };

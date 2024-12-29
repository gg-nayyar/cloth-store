import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.CLIENT_ID);
export const googleAuth = async (token: string): Promise<any> => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });

  const payload = ticket.getPayload();
  if (!payload) {
    throw new Error("Invalid token");
  }
  return {
    name: payload.name,
    email: payload.email,
    googleId: payload.sub,
    picture: payload.picture,
  };
};

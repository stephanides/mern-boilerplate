import * as jwt from "jsonwebtoken";
import { config } from "../../../config";

export async function validateHuman(recaptchaToken: string): Promise<boolean> {
  const secret = config.recaptcha.secret;
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptchaToken}`,
    {
      method: "POST",
    }
  );
  const data = await response.json();
  return data.success;
}

export const verifyToken: (ctx: any, secret: string) => Promise<void> = (
  ctx,
  secret
) =>
  new Promise((resolve, reject) => {
    const { token } = ctx;

    jwt.verify(token, secret, { algorithms: ["HS256"] }, (err, decoded) => {
      if (err) {
        reject(err);
      }

      const { exp } = decoded as any;
      const expires = exp * 1000;
      const now = new Date().getTime();

      if (now > expires) {
        const tokenExpired = new Error("Token has expired");

        reject(tokenExpired);
      }

      resolve();
    });
  });

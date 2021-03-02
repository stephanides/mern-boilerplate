import User, { IUser } from "../../../../db/models/User";
import { config } from "../../../../config";
import { verifyToken } from "../../utils";

const users: (root: any, args: any, ctx: any) => Promise<IUser[] | []> = async (
  root,
  args,
  ctx
) => {
  try {
    const { jwtSecret } = config;
    await verifyToken(ctx, jwtSecret);

    const result: IUser[] = (await User.find()) || [];

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export default users;

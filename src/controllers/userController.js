import { generate, check } from "../helpers/bcrypt";
import { sign } from "../helpers/jwt";
import User from "../models/User";

class UserController {
  static async signUp(req, res) {
    try {
      const { name, email } = req.body;
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res
          .status(409)
          .json({ status: 409, message: "This email is taken" });
      }
      const hashedPassword = await generate(req.body.password);
      const user = await User.create({ name, email, password: hashedPassword });
      user.password = undefined;
      const accessToken = sign({
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      });
      user._doc.accessToken = accessToken;
      return res
        .status(201)
        .json({
          status: 201,
          message: "User created successfully",
          data: { user },
        });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "Internal server error", error:error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ status: 401, message: "Wrong email" });
      }
      if (!check(user.password, password)) {
        return res.status(401).json({ status: 401, message: "Wrong password" });
      }
      const accessToken = sign({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });
      user.password = undefined;
      user._doc.accessToken = accessToken;
      return res
        .status(200)
        .json({
          status: 200,
          message: "User logged in successfully",
          data: { user },
        });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "Internal server error", error:error.message });
    }
  }
}

export default UserController;

import { verify } from "../helpers/jwt"
class IsAllowed {
  static async verifyToken(req, res, next) {
    try {
      const authHeader = req.headers.token;
      if (!authHeader) {
        return res.status(401).json({ status: 401, message: "Not Authorized" });
      }
      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({ status: 401, message: "Not Authorized" });
      }
      const verified = verify(token);
      req.user = verified;
      next();
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "Internal server error", error:error.message });
    }
  }

  static verifyAdmin(req, res, next) {
    IsAllowed.verifyToken(req, res, () => {
      if (req.user.role.includes("admin")) {
        return next();
      } else {
        return res
          .status(403)
          .json({ status: 403, message: "You are not allowed to perform this action" });
      }
    });
  }
}

export default IsAllowed;

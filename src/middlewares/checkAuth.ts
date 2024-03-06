import type { Response, NextFunction, Request } from "express";

import type { RequestAuth } from "../types/common/RequestAuth";
import verifyJWTToken from "../helpers/verifyJWTToken.ts";

const ignoredRoutes = [
  "/api/auth/sign-in",
  "/api/auth/sign-up",
  "/api/user/verify",
];

export default function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (ignoredRoutes.includes(req.path)) {
    return next();
  }

  const authorization = req.headers?.authorization;

  if (typeof authorization === "string") {
    const token = authorization.split("Bearer ")[1];

    verifyJWTToken(token)
      .then((userData) => {
        (req as RequestAuth).user = userData.data;
        (req as RequestAuth).token = token;

        next();
      })
      .catch(() => {
        res.status(403).json({ message: "Invalid auth token provided." });
      });
  } else {
    res.status(403).json({ message: "Auth token is empty" });
  }
}

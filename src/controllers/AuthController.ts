import type { Request, Response } from "express";
import { validationResult } from "express-validator";

import UserService from "../services/UserService.ts";
import AuthService from "../services/AuthService.ts";
import TokenService from "../services/TokenService.ts";

class AuthController {
  async signUp(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const newUser = await UserService.create({
        data: {
          name: req.body.name,
          password: req.body.password,
          email: req.body.email,
        },
      });
      const accessToken = await TokenService.create({ userId: newUser.id });

      res.json({ user: newUser, access_token: accessToken.access_token });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error?.message,
      });
    }
  }

  async signIn(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const signInResult = await AuthService.signIn({
        email: req.body.email,
        password: req.body.password,
      });
      res.json(signInResult);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error?.message,
      });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const authorization = req.headers?.authorization;

      if (typeof authorization !== "string") {
        throw new Error("Access Token is not provided");
      }

      const accessToken = authorization.split("Bearer ")[1];

      const logoutResult = await AuthService.logout(accessToken);
      res.json(logoutResult);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error?.message,
      });
    }
  }
}

export default AuthController;

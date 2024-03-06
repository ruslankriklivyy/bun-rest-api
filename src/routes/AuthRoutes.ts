import express from "express";
const router = express.Router();

import AuthController from "../controllers/AuthController.ts";
import signUpValidation from "../helpers/validations/auth/sign-up-validation.ts";
import signInValidation from "../helpers/validations/auth/sign-in-validation.ts";

router.post("/auth/sign-up", signUpValidation, AuthController.signUp);
router.post("/auth/sign-in", signInValidation, AuthController.signIn);
router.post("/auth/logout", AuthController.logout);

export default router;

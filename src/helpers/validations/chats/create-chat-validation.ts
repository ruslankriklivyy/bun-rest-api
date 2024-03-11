import { check } from "express-validator";

export default [
  check("name").isString().isLength({ min: 3, max: 88 }),
  check("members_ids").isArray(),
];

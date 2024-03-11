import { check } from "express-validator";

export default [
  check("body").isString().isLength({ min: 3, max: 280 }),
  check("files_ids").isArray(),
];

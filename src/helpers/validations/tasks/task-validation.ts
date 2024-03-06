import { check } from "express-validator";

export default [
  check("name").isString().isLength({ min: 3, max: 88 }),
  check("description").isString().isLength({ max: 255 }),
  check("end_date").isString().isLength({ min: 10 }),
  check("is_completed").isBoolean(),
];

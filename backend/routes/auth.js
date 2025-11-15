const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const authController = require("../controllers/authController");
const { validateRequest } = require("../middleware/validateRequest");

router.post(
  "/register",
  [
    body("name").isString().trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
      .matches(/[0-9]/)
      .withMessage("Password must contain a number")
      .matches(/[A-Z]/)
      .withMessage("Password must contain an uppercase letter"),
  ],
  validateRequest,
  authController.register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  authController.login
);

module.exports = router;
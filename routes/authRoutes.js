const express = require("express");
const { check } = require("express-validator");
const UserController = require("../controllers/userController");

const router = express.Router();

router.get("/signIn", UserController.showLoginForm);

router.post(
  "/signIn",
  [
    check("email").isEmail().withMessage("Please enter a valid email address"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  UserController.loginForm
);

router.get("/signUp", UserController.showSignupForm);

router.post(
  "/signUp",
  [
    check("role")
      .isIn(["Admin", "Customer"])
      .withMessage("role must be Admin or Customer")
      .notEmpty()
      .withMessage("role is required"),
    check("firstName").notEmpty().withMessage("First name is required"),
    check("lastName").notEmpty().withMessage("Last name is required"),
    check("email").isEmail().withMessage("Please enter a valid email address"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    check("phoneNbr")
      .optional({ nullable: true }) // Allows the field to be null or omitted
      .isString()
      .withMessage("phoneNbr must be a string"),
  ],
  UserController.signupForm
);

module.exports = router;

const User = require("../models/userModel.js");
const userService = require("../services/userService.js");
const Hashing = require("../Utils/hashing.js");
const moment = require("moment");

/**
 * @class UserController
 * @description Handles CRUD operations for users such as creating, updating, deleting, and retrieving user data.
 */
class UserController {
  /**
   * @description Creates a new user.
   * @param {Request} req - The request object containing user data.
   * @param {Response} res - The response object to send the result.
   * @returns {void}
   */
  static async create(req, res) {
    try {
      const { role, firstName, lastName, email, password, phoneNbr } = req.body;
      const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
      var user = new User(
        0,
        role,
        createdAt,
        firstName,
        lastName,
        email,
        password,
        phoneNbr
      );
      const result = await userService.create(user);
      res.status(200).json({ message: "User created successfully", result });
    } catch (err) {
      console.error("Error in UserController.create: ", err.message);
      res.status(500).json(err.message);
    }
  }

  /**
   * @description Updates an existing user.
   * @param {Request} req - The request object containing updated user data.
   * @param {Response} res - The response object to send the result.
   * @returns {void}
   */
  static async update(req, res) {
    try {
      const { role, firstName, lastName, email, phoneNbr } = req.body;
      const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
      const { id } = req.params;
      var user = new User(
        id,
        role,
        createdAt,
        firstName,
        lastName,
        email,
        phoneNbr
      );
      const result = await userService.update(user);
      res.status(200).json({ message: "User updated successfully", result });
    } catch (err) {
      console.error("Error in UserController.update: ", err.message);
      res.status(500).json(err.message);
    }
  }

  /**
   * @description Deletes a user by their ID.
   * @param {Request} req - The request object containing the user ID.
   * @param {Response} res - The response object to send the result.
   * @returns {void}
   */
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await userService.delete(id);
      res.status(200).json({ message: "User deleted successfully", result });
    } catch (err) {
      console.error("Error in UserController.delete: ", err.message);
      res.status(500).json(err.message);
    }
  }

  /**
   * @description Retrieves all users.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object to send the result.
   * @returns {void}
   */
  static async readAll(req, res) {
    try {
      const result = await userService.readAll();
      res.status(200).json({ message: "Users retrieved successfully", result });
    } catch (err) {
      console.error("Error in UserController.readAll: ", err.message);
      res.status(500).json(err.message);
    }
  }

  /**
   * @description Retrieves a user by their ID.
   * @param {Request} req - The request object containing the user ID.
   * @param {Response} res - The response object to send the result.
   * @returns {void}
   */
  static async readUserById(req, res) {
    try {
      const { id } = req.params;
      const result = await userService.readUserById(id);
      res.status(200).json({ message: "User retrieved successfully", result });
    } catch (err) {
      console.error("Error in UserController.readUserById: ", err.message);
      res.status(500).json(err.message);
    }
  }

  /**
   * @description Retrieves a user by their first name.
   * @param {Request} req - The request object containing the user's first name.
   * @param {Response} res - The response object to send the result.
   * @returns {void}
   */
  static async readUserByFirstName(req, res) {
    try {
      const { firstName } = req.params;
      const result = await userService.readUserByFirstName(firstName);
      res.status(200).json({ message: "User retrieved successfully", result });
    } catch (err) {
      console.error(
        "Error in UserController.readUserByFirstName: ",
        err.message
      );
      res.status(500).json(err.message);
    }
  }

  /**
   * @description Retrieves a user by their last name.
   * @param {Request} req - The request object containing the user's last name.
   * @param {Response} res - The response object to send the result.
   * @returns {void}
   */
  static async readUserByLastName(req, res) {
    try {
      const { lastName } = req.params;
      const result = await userService.readUserByLastName(lastName);
      //res.status(200).json({message: "User retrieved successfully", result});
    } catch (err) {
      console.error(
        "Error in UserController.readUserByLastName: ",
        err.message
      );
      res.status(500).json(err.message);
    }
  }

  /**
   * @description Retrieves a user by their email.
   * @param {Request} req - The request object containing the user's email.
   * @param {Response} res - The response object to send the result.
   * @returns {void}
   */
  static async readUserByEmail(req, res) {
    try {
      const { email } = req.params;
      const result = await userService.readUserByEmail(email);
      res.status(200).json({ message: "User retrieved successfully", result });
    } catch (err) {
      console.error("Error in UserController.readUserByEmail: ", err.message);
      res.status(500).json(err.message);
    }
  }

  /**
   * @description Retrieves the user's password by their email.
   * @param {Request} req - The request object containing the user's email.
   * @param {Response} res - The response object to send the result.
   * @returns {void}
   */
  static async getPasswordByEmail(req, res) {
    try {
      const { email } = req.params;
      const result = await userService.getPasswordByEmail(email);
      res
        .status(200)
        .json({ message: "Password retrieved successfully", result });
    } catch (err) {
      console.error(
        "Error in UserController.getPasswordByEmail: ",
        err.message
      );
      res.status(500).json(err.message);
    }
  }

  /**
   * @description Retrieves all tickets associated with a user by their ID.
   * @param {Request} req - The request object containing the user ID.
   * @param {Response} res - The response object to send the result.
   * @returns {void}
   */
  static async readUserTickets(req, res) {
    try {
      const { id } = req.params;
      const result = await userService.readUserTickets(id);
      res
        .status(200)
        .json({ message: "User tickets retrieved successfully", result });
    } catch (err) {
      console.error("Error in UserController.readUserTickets: ", err.message);
      res.status(500).json(err.message);
    }
  }

  /**
   * @description Retrieves all users by their role.
   * @param {Request} req - The request object containing the role.
   * @param {Response} res - The response object to send the result.
   * @returns {void}
   */
  static async readUserByRole(req, res) {
    try {
      const { role } = req.params;
      const result = await userService.readUserByRole(role);
      res
        .status(200)
        .json({ message: "Users by role retrieved successfully", result });
    } catch (err) {
      console.error("Error in UserController.readUserByRole: ", err.message);
      res.status(500).json(err.message);
    }
  }

  /**
   * @description Retrieves the user's role by their ID.
   * @param {Request} req - The request object containing the user ID.
   * @param {Response} res - The response object to send the result.
   * @returns {void}
   */
  static async readUserRoleById(req, res) {
    try {
      const { id } = req.params;
      const result = await userService.readUserRoleById(id);
      res
        .status(200)
        .json({ message: "User role retrieved successfully", result });
    } catch (err) {
      console.error("Error in UserController.readUserRoleById: ", err.message);
      res.status(500).json(err.message);
    }
  }

  /**
   * @description Handles user login by checking email and password.
   * @param {Request} req - The request object containing user credentials.
   * @param {Response} res - The response object to send the result.
   * @returns {void}
   */
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }

      const user = await userService.login(email, password);
      return res.status(200).json({ message: "Login successful", user });
    } catch (err) {
      console.error("Error in UserController.login: ", err.message);
      return res.status(500).json({ message: err.message });
    }
  }

  /**
   * @description Changes a user's password.
   * @param {Request} req - The request object containing the user's email, old password, and new password.
   * @param {Response} res - The response object to send the result.
   * @returns {void}
   */
  static async changePassword(req, res) {
    try {
      const { email, oldPassword, newPassword } = req.body;
      const user = await userService.readUserByEmail(email);
      const result = await userService.changePassword(
        email,
        oldPassword,
        newPassword
      );
      return res
        .status(200)
        .json({ message: `Password changed successfully`, result: result });
    } catch (err) {
      console.error("Error in UserController.changePassword: ", err.message);
      return res.status(500).json({ message: err.message });
    }
  }

  static async loadUsersView(req, res) {
    try {
      const users = await UserService.readUsers();
      res.render("users", {
        users: users,
        message: "Welcome to csis 228 class",
      });
    } catch (err) {
      console.error("Error in UserController.loadUsersView: ", err.message);
      res.status(500).json(err.message);
    }
  }

  // Show login form
  static showLoginForm(req, res) {
    const error = req.session.error || null;
    const remember = req.session.remember || false;

    // Clear session messages after displaying
    req.session.error = null;
    req.session.remember = false;

    res.render("signIn.ejs", { error, remember });
  }

  // Handle login form submission
  static async loginForm(req, res) {
    const { email, password, remember } = req.body;

    try {
      const user = await userService.login(email, password);

      if (user) {
        res.render("home.ejs", { title: "Home" });
      } else {
        req.session.error = "Incorrect email or password.";
        req.session.remember = !!remember;
        res.redirect("/signIn");
      }
    } catch {
      req.session.error = "Incorrect email or password.";
      req.session.remember = !!remember;
      res.redirect("/signIn");
    }
  }

  static showSignupForm(req, res) {
    res.render("signUp.ejs", { error: null });
  }

  static async signupForm(req, res) {
    try {
      const { role, firstName, lastName, email, password, phoneNbr } = req.body;
      const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");

      let user = new User(
        null,
        role,
        createdAt,
        firstName,
        lastName,
        email,
        password,
        phoneNbr
      );
      const results = await userService.create(user);
      return res.redirect("/signIn");
    } catch (error) {
      console.error("Error during signup:", error);
      const errorMessage =
        error.message === "EMAIL_ALREADY_EXISTS"
          ? "This email is already registered."
          : "Registration failed. Please try again.";

      return res.render("signUp.ejs", {
        error: errorMessage,
      });
    }
  }
}

module.exports = UserController;

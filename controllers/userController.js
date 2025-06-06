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

      // 1. Ensure all fields are present
      if (!email || !oldPassword || !newPassword) {
        return res.status(400).render("changePassword", {
          user: { email },
          error: "Email, current password, and new password are all required.",
          success: null,
        });
      }

      // 2. Check that the user exists
      const user = await userService.readUserByEmail(email);
      if (!user) {
        return res.status(404).render("changePassword", {
          user: { email },
          error: `No account found for ${email}.`,
          success: null,
        });
      }

      // 3. Attempt to change the password
      await userService.changePassword(email, oldPassword, newPassword);

      // 4. If we reach here, it succeeded – re‐render with a success message
      return res.render("changePassword", {
        user: { email: "" },                 // clear the email field (optional)
        error: null,
        success: "Password changed successfully.",
      });
    } catch (err) {
      // 5. If old‐password was wrong, or any “expected” error
      if (err.message.includes("Old password is incorrect")) {
        return res.status(400).render("changePassword", {
          user: { email: req.body.email },
          error: "Current password is incorrect.",
          success: null,
        });
      }
      if (err.message.includes("does not exist")) {
        return res.status(404).render("changePassword", {
          user: { email: req.body.email },
          error: err.message, // e.g. “User with email … does not exist”
          success: null,
        });
      }

      // 6. Otherwise, this is unexpected – log and show a generic message
      console.error("Error in UserController.changePassword:", err);
      return res.status(500).render("changePassword", {
        user: { email: req.body.email },
        error: "Something went wrong. Please try again later.",
        success: null,
      });
    }
  }

  static async loadCustomersView(req, res) {
    try {
      const users = await userService.readAll();
      const customers = users.filter((user) => user.role === "Customer");
      res.render("customers", {
        users: customers,
        message: "TicketHaven Customer List: ",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error loading customers.");
    }
  }

  static async loadCustomerEditForm(req, res) {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).send("Invalid user ID");
    }

    try {
      const user = await userService.readUserById(userId);
      if (!user || user.role !== "Customer") {
        return res.status(404).send("Customer not found");
      }
      res.render("editCustomer", { user, message: "Edit Customer Profile:" });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error loading customer.");
    }
  }

  static async updateCustomer(req, res) {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).send("Invalid user ID");
    }

    const updatedUser = {
      id: userId,
      role: req.body.role,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNbr: req.body.phoneNbr,
    };

    try {
      await userService.update(updatedUser);
      // On success, redirect to customers list
      res.redirect("/viewCustomers");
    } catch (err) {
      console.error("Error in updateCustomer:", err.message);

      // Check if error is duplicate email error
      if (
        err.message.includes("Duplicate entry") &&
        err.message.includes("email")
      ) {
        // Render the same editCustomer view with error message and original user data (to repopulate form)
        return res.status(400).render("editCustomer", {
          user: updatedUser,
          errorMessage: "Email already exists. Please use a different email.",
        });
      }

      // Other errors
      res.status(500).render("editCustomer", {
        user: updatedUser,
        errorMessage: "Failed to update customer. Please try again.",
      });
    }
  }

  // Show login page (GET /signin)
  static showLoginForm(req, res) {
    return res.render("signIn.ejs", {
      error: null,
      email: "",
    });
  }

  // Handle login (POST /signin)
  static async loginForm(req, res) {
    try {
      const { email, password } = req.body;
      const isValid = await userService.login(email, password);

      if (!isValid) {
        // login failed → re-render AND return immediately
        return res.render("signIn.ejs", {
          error: "Incorrect email or password.",
          email,
        });
      }

      // login succeeded → fetch full user
      const user = await userService.readUserByEmail(email);

      // role-based redirect; return immediately in every case:
      if (user[0].role === "Admin") {
        return res.redirect("/Admin");
      }
      if (user[0].role === "Customer") {
        return res.redirect("/Customer");
      }

      // unknown role → fallback redirect
      return res.redirect("/");
    } catch (err) {
      console.error("Error during login:", err);
      // on error → render sign-in again
      return res.render("signIn.ejs", {
        error: "Server error. Please try again.",
        email: req.body.email || "",
      });
    }
  }

  static showSignupForm(req, res) {
    res.render("signUp.ejs", { error: null });
  }

  static async signupForm(req, res) {
    try {
      // Destructure everything — note use of `let` so we can reassign below
      let { role, firstName, lastName, email, password, phoneNbr } = req.body;

      // If phoneNbr is empty (user left it blank), treat it as null
      if (!phoneNbr || phoneNbr.trim() === "") {
        phoneNbr = null;
      }

      const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");

      // Build your User model with phoneNbr now either a string or null
      const user = new User(
        null,
        role,
        createdAt,
        firstName,
        lastName,
        email,
        password,
        phoneNbr
      );

      await userService.create(user);
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

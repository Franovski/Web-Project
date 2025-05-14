const db = require("../config/db");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const Hashing = require("../Utils/hashing");
const Utils = require("../Utils/utils");

class UserRepository {
  /**
   * Creates a new user in the database.
   * @param {User} user - The user object containing user info.
   * @returns {User} - Insert result (affectedRows).
   */

  static async create(user) {
    try {
      let sql = `INSERT INTO user
            (role, created_at, first_name, last_name, email, password, phone_number)
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const hashedPassword = await Hashing.hashPassword(user.password);
      const dateFormatted = await Utils.formatDateSQL(user.createdAt);
      const { affectedRows, insertId } = await db.query(sql, [
        user.role,
        dateFormatted,
        user.firstName,
        user.lastName,
        user.email,
        hashedPassword,
        user.phoneNbr,
      ]);
      return {
        affectedRows,
        //insertId
      };
    } catch (err) {
      // Check if it's a duplicate entry error from MySQL
      if (err.code === "ER_DUP_ENTRY" && err.message.includes("email")) {
        throw new Error("EMAIL_ALREADY_EXISTS");
      }
      throw err; // rethrow other errors unchanged
    }
  }

  /**
   * Updates an existing user's data (excluding password).
   * @param {User} user - The user object with updated values.
   * @returns {User} - Update status message and affected rows.
   */

  static async update(user) {
    try {
      let sql = `UPDATE user
            SET role = ?, created_at = ?, first_name = ?, last_name = ?, email = ?, phone_number = ?
            WHERE user_id = ?`;
      // const hashedPassword = await Hashing.hashPassword(user.password);
      const dateFormatted = await Utils.formatDateSQL(user.createdAt);
      const { affectedRows } = await db.query(sql, [
        user.role,
        dateFormatted,
        user.firstName,
        user.lastName,
        user.email,
        user.phoneNbr,
        user.id,
      ]);
      //return {affectedRows};
      return {
        message: affectedRows > 0 ? "User updated" : "Update failed",
        affectedRows,
      };
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Deletes a user by their ID.
   * @param {number} id - The ID of the user to delete.
   * @returns {User} - Deletion status message and affected rows.
   */

  static async delete(id) {
    try {
      let sql = `DELETE FROM user
            WHERE user_id = ?`;

      const { affectedRows } = await db.query(sql, [id]);
      //return {affectedRows};
      return {
        message: affectedRows > 0 ? "User deleted" : "Deletion failed",
        affectedRows,
      };
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves all users from the database.
   * @returns {Array} - List of all users.
   */

  static async readAll() {
    try {
      const rows = await db.query("SELECT * FROM user");
      return rows.map(User.fromRow);
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves a user by their ID.
   * @param {number} id - User ID.
   * @returns {User} - User object.
   */

  static async readUserById(id) {
    try {
      let sql = `SELECT * FROM user
            WHERE user_id = ${id}`;
      const rows = await db.query(sql);
      return User.fromRow(rows[0]);
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves users by first name.
   * @param {string} firstName - First name to search.
   * @returns {Array} - Matching users.
   */

  static async readUserByFirstName(firstName) {
    try {
      let sql = `SELECT * FROM user WHERE first_name = ?`;
      const rows = await db.query(sql, [firstName]);
      return rows.map((row) => User.fromRow(row));
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves users by last name.
   * @param {string} lastName - Last name to search.
   * @returns {Array} - Matching users.
   */

  static async readUserByLastName(lastName) {
    try {
      let sql = `SELECT * FROM user
            WHERE last_name = ?`;
      const rows = await db.query(sql, [lastName]);
      return rows.map((row) => User.fromRow(row));
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves user(s) by email.
   * @param {string} email - Email to search.
   * @returns {Array} - Matching users.
   */

  static async readUserByEmail(email) {
    try {
      let sql = `SELECT * FROM user
            WHERE email = ?`;
      const rows = await db.query(sql, [email]);
      return rows.map((row) => User.fromRow(row));
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Gets the hashed password of a user by email.
   * @param {string} email - User email.
   * @returns {Array} - Array containing password field.
   */

  static async getPasswordByEmail(email) {
    try {
      let sql = `SELECT password FROM user
            WHERE email = ?`;
      const rows = await db.query(sql, [email]);
      return rows.map((row) => User.fromRow(row));
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves all tickets associated with a user ID.
   * @param {number} id - User ID.
   * @returns {Array} - User's tickets.
   */

  static async readUserTickets(id) {
    try {
      let sql = `SELECT * FROM ticket
            WHERE user_id = ?`;
      const rows = await db.query(sql, [id]);
      return rows.map((row) => Ticket.fromRow(row));
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves users by role.
   * @param {string} role - Role to filter by.
   * @returns {Array} - Users with the specified role.
   */

  static async readUserByRole(role) {
    try {
      let sql = `SELECT * FROM user
            WHERE role = ?`;
      const rows = await db.query(sql, [role]);
      return rows.map((row) => User.fromRow(row));
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves a user's role by their ID.
   * @param {number} id - User ID.
   * @returns {Array} - User's role.
   */

  static async readUserRoleById(id) {
    try {
      let sql = `SELECT role FROM user
            WHERE user_id = ?`;
      const rows = await db.query(sql, [id]);
      return rows.map((row) => User.fromRow(row));
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Checks if a user exists by their ID.
   * @param {number} id - User ID.
   * @returns {boolean} - True if exists, else false.
   */

  static async isUserExistById(id) {
    try {
      let sql = `SELECT * FROM user WHERE user_id = ?`;
      const rows = await db.query(sql, [id]);
      return rows.length > 0;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Checks if a user exists by first name.
   * @param {string} firstName - First name.
   * @returns {boolean} - True if exists, else false.
   */

  static async isUserExistByFirstName(firstName) {
    try {
      let sql = `SELECT * FROM user WHERE first_name = ?`;
      const rows = await db.query(sql, [firstName]);
      return rows.length > 0;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Checks if a user exists by last name.
   * @param {string} lastName - Last name.
   * @returns {boolean} - True if exists, else false.
   */

  static async isUserExistByLastName(lastName) {
    try {
      let sql = `SELECT * FROM user WHERE last_name = ?`;
      const rows = await db.query(sql, [lastName]);
      return rows.length > 0;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Checks if a user exists by email.
   * @param {string} email - Email address.
   * @returns {boolean} - True if exists, else false.
   */

  static async isUserExistByEmail(email) {
    try {
      let sql = `SELECT * FROM user WHERE email = ?`;
      const rows = await db.query(sql, [email]);
      return rows.length > 0 ? true : false;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Checks if any user exists with the specified role.
   * @param {string} role - Role name.
   * @returns {boolean} - True if exists, else false.
   */

  static async isUserExistByRole(role) {
    try {
      let sql = `SELECT * FROM user WHERE role = ?`;
      const rows = await db.query(sql, [role]);
      return rows.length > 0 ? true : false;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Changes a user's password by email.
   * @param {string} email - User's email.
   * @param {string} newPassword - New plain password to be hashed.
   * @returns {number} - Number of affected rows.
   */

  static async changePassword(email, newPassword) {
    try {
      let sql = `UPDATE user
            SET password = ?
            WHERE email = ?`;
      const hashedPassword = await Hashing.hashPassword(newPassword);
      const { affectedRows } = await db.query(sql, [hashedPassword, email]);
      return affectedRows;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = UserRepository;

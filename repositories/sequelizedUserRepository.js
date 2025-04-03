const User = require("../models/sequelizedUserModel");
const Ticket = require("../models/sequelizedTicketModel");
const Hashing = require("../Utils/hashing");
const Utils = require("../Utils/utils");

class UserRepository {

  /**
   * Creates a new user in the database.
   * @param {User} user - The user object to be created.
   * @param {string} user.role - The role of the user (e.g., 'admin', 'user').
   * @param {string} user.createdAt - The date the user was created.
   * @param {string} user.firstName - The user's first name.
   * @param {string} user.lastName - The user's last name.
   * @param {string} user.email - The user's email address.
   * @param {string} user.password - The user's password.
   * @param {string} user.phoneNbr - The user's phone number.
   * @returns {Promise<User>} The created user object.
   */
  static async create(user) {
    try {
      const addedUser = await User.create({
        role: user.role,
        created_at: Utils.formatDateSQL(user.createdAt),
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: await Hashing.hashPassword(user.password),
        phone_number: user.phoneNbr,
      });
      return addedUser;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Updates an existing user in the database.
   * @param {User} user - The user object with updated details.
   * @param {string} user.role - The role of the user.
   * @param {string} user.createdAt - The creation date of the user.
   * @param {string} user.firstName - The user's first name.
   * @param {string} user.lastName - The user's last name.
   * @param {string} user.email - The user's email address.
   * @param {string} user.password - The user's password.
   * @param {string} user.phoneNbr - The user's phone number.
   * @returns {Promise<number>} The number of updated rows.
   */
  static async update(user) {
    try {
      const [updated] = await User.update(
        {
          role: user.role,
          created_at: Utils.formatDateSQL(user.createdAt),
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
          password: await Hashing.hashPassword(user.password),
          phone_number: user.phoneNbr,
        },
        {
          where: { user_id: user.id },
        }
      );
      return updated;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Deletes a user from the database.
   * @param {number} id - The ID of the user to be deleted.
   * @returns {Promise<number>} The number of deleted rows.
   */
  static async delete(id) {
    try {
      return await User.destroy({ where: { user_id: id } });
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves all users from the database.
   * @returns {Promise<Array>} A list of all users.
   */
  static async readAll() {
    try {
      return await User.findAll();
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves a user by their ID.
   * @param {number} id - The ID of the user to be fetched.
   * @returns {Promise<User|null>} The user object if found, or null if not found.
   */
  static async readUserById(id) {
    try {
      return await User.findByPk(id);
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves a user by their first name.
   * @param {string} firstName - The first name of the user to be fetched.
   * @returns {Promise<User|null>} The user object if found, or null if not found.
   */
  static async readUserByFirstName(firstName) {
    try {
      return await User.findOne({ where: { first_name: firstName } });
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves a user by their last name.
   * @param {string} lastName - The last name of the user to be fetched.
   * @returns {Promise<User|null>} The user object if found, or null if not found.
   */
  static async readUserByLastName(lastName) {
    try {
      return await User.findOne({ where: { last_name: lastName } });
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves a user by their email.
   * @param {string} email - The email of the user to be fetched.
   * @returns {Promise<User|null>} The user object if found, or null if not found.
   */
  static async readUserByEmail(email) {
    try {
      return await User.findOne({ where: { email: email } });
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves the password of a user by their email.
   * @param {string} email - The email of the user whose password is to be fetched.
   * @returns {Promise<string|null>} The password of the user if found, or null if not found.
   */
  static async getPasswordByEmail(email) {
    try {
      const user = await User.findOne({ where: { email: email } });
      return user.password;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves all tickets associated with a specific user.
   * @param {number} id - The ID of the user whose tickets are to be fetched.
   * @returns {Promise<Array>} A list of tickets associated with the user.
   */
  static async readUserTickets(id) {
    try {
      const tickets = await Ticket.findAll({ where: { user_id: id } });
      return tickets;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves all users with a specific role.
   * @param {string} role - The role of the users to be fetched.
   * @returns {Promise<Array>} A list of users with the specified role.
   */
  static async readUserByRole(role) {
    try {
      return await User.findAll({ where: { role: role } });
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves the role of a user by their ID.
   * @param {number} id - The ID of the user whose role is to be fetched.
   * @returns {Promise<string|null>} The role of the user if found, or null if not found.
   */
  static async readUserRoleById(id) {
    try {
      const user = await User.findByPk(id);
      return user.role;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Checks if a user exists by their ID.
   * @param {number} id - The ID of the user to check.
   * @returns {Promise<boolean>} `true` if the user exists, otherwise `false`.
   */
  static async isUserExistById(id) {
    try {
      const user = await User.findByPk(id);
      return user !== null;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Checks if a user exists by their first name.
   * @param {string} firstName - The first name of the user to check.
   * @returns {Promise<boolean>} `true` if the user exists, otherwise `false`.
   */
  static async isUserExistByFirstName(firstName) {
    try {
      const user = await User.findOne({ where: { first_name: firstName } });
      return user !== null;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Checks if a user exists by their last name.
   * @param {string} lastName - The last name of the user to check.
   * @returns {Promise<boolean>} `true` if the user exists, otherwise `false`.
   */
  static async isUserExistByLastName(lastName) {
    try {
      const user = await User.findOne({ where: { last_name: lastName } });
      return user !== null;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Checks if a user exists by their email.
   * @param {string} email - The email of the user to check.
   * @returns {Promise<boolean>} `true` if the user exists, otherwise `false`.
   */
  static async isUserExistByEmail(email) {
    try {
      const user = await User.findOne({ where: { email: email } });
      return user !== null;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Changes the password of a user by their email.
   * @param {string} email - The email of the user whose password is to be changed.
   * @param {string} newPassword - The new password to set for the user.
   * @returns {Promise<number>} The number of updated rows.
   */
  static async changePassword(email, newPassword) {
    try {
      const hashedPassword = await Hashing.hashPassword(newPassword);
      const [updatedRows] = await User.update(
        { password: hashedPassword },
        { where: { email } }
      );
      return updatedRows;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = UserRepository;

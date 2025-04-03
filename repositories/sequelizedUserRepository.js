const User = require("../models/sequelizedUserModel");
const Ticket = require("../models/sequelizedTicketModel");
const Hashing = require("../Utils/hashing");
const Utils = require("../Utils/utils");

class UserRepository {
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

  static async delete(id) {
    try {
      return await User.destroy({ where: { user_id: id } });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async readAll() {
    try {
      return await User.findAll();
    } catch (err) {
      throw new Error(err);
    }
  }

  static async readUserById(id) {
    try {
      return await User.findByPk(id);
    } catch (err) {
      throw new Error(err);
    }
  }

  static async readUserByFirstName(firstName) {
    try {
      return await User.findOne({ where: { first_name: firstName } });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async readUserByLastName(lastName) {
    try {
      return await User.findOne({ where: { last_name: lastName } });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async readUserByEmail(email) {
    try {
      return await User.findOne({ where: { email: email } });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getPasswordByEmail(email) {
    try {
      const user = await User.findOne({ where: { email: email } });
      return user.password;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async readUserTickets(id) {
    try {
      const tickets = await Ticket.findAll({ where: { user_id: id } });
      return tickets;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async readUserByRole(role) {
    try {
      return await User.findAll({ where: { role: role } });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async readUserRoleById(id) {
    try {
      const user = await User.findByPk(id);
      return user.role;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async isUserExistById(id) {
    try {
      const user = await User.findByPk(id);
      return user !== null;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async isUserExistByFirstName(firstName) {
    try {
      const user = await User.findOne({ where: { first_name: firstName } });
      return user !== null;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async isUserExistByLastName(lastName) {
    try {
      const user = await User.findOne({ where: { last_name: lastName } });
      return user !== null;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async isUserExistByEmail(email) {
    try {
      const user = await User.findOne({ where: { email: email } });
      return user !== null;
    } catch (err) {
      throw new Error(err);
    }
  }

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

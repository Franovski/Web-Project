const Section = require("../models/sequelizedSectionModel");

class SectionRepository {

  /**
   * Creates a new section in the database.
   * @param {Section} section - The section object to be created.
   * @param {string} section.name - The name of the section.
   * @param {number} section.rowCount - The number of rows in the section.
   * @param {number} section.seatCount - The number of seats in the section.
   * @param {string} section.status - The status of the section.
   * @param {number} section.eventId - The ID of the event associated with the section.
   * @returns {Promise<Section>} The created section object.
   */
  static async create(section) {
    try {
      const addedSection = await Section.create({
        section_name: section.name,
        row_count: section.rowCount,
        seat_count: section.seatCount,
        section_status: section.status,
        event_id: section.eventId,
      });
      return addedSection;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Updates an existing section in the database.
   * @param {Section} section - The section object to be updated.
   * @param {string} section.name - The name of the section.
   * @param {number} section.rowCount - The number of rows in the section.
   * @param {number} section.seatCount - The number of seats in the section.
   * @param {string} section.status - The status of the section.
   * @param {number} section.eventId - The ID of the event associated with the section.
   * @returns {Promise<number>} The number of updated rows.
   */
  static async update(section) {
    try {
      const [updated] = await Section.update(
        {
          section_name: section.name,
          row_count: section.rowCount,
          seat_count: section.seatCount,
          section_status: section.status,
          event_id: section.eventId,
        },
        {
          where: { section_id: section.id },
        }
      );
      return updated;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Deletes a section from the database.
   * @param {number} id - The ID of the section to be deleted.
   * @returns {Promise<number>} The number of deleted rows.
   */
  static async delete(id) {
    try {
      return await Section.destroy({ where: { section_id: id } });
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves all sections from the database.
   * @returns {Promise<Array>} A list of all sections.
   */
  static async readAll() {
    try {
      return await Section.findAll();
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves a section by its ID.
   * @param {number} id - The ID of the section to be fetched.
   * @returns {Promise<Section|null>} The section object if found, or null if not found.
   */
  static async readSectionById(id) {
    try {
      return await Section.findByPk(id);
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves a section by its name.
   * @param {string} name - The name of the section to be fetched.
   * @returns {Promise<Array>} A list of sections matching the name.
   */
  static async readSectionByName(name) {
    try {
      return await Section.findAll({ where: { section_name: name } });
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves sections by their status.
   * @param {string} status - The status of the section(s) to be fetched.
   * @returns {Promise<Array>} A list of sections matching the status.
   */
  static async readSectionByStatus(status) {
    try {
      return await Section.findAll({ where: { section_status: status } });
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Checks if a section exists by its ID.
   * @param {number} id - The ID of the section to check.
   * @returns {Promise<boolean>} `true` if the section exists, otherwise `false`.
   */
  static async isSectionExistById(id) {
    try {
      const section = await Section.findByPk(id);
      return section !== null;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Checks if a section exists by its name.
   * @param {string} name - The name of the section to check.
   * @returns {Promise<boolean>} `true` if the section exists, otherwise `false`.
   */
  static async isSectionExistByName(name) {
    try {
      const section = await Section.findOne({ where: { section_name: name } });
      return section !== null;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Checks if a section exists by its status.
   * @param {string} status - The status of the section to check.
   * @returns {Promise<boolean>} `true` if the section exists, otherwise `false`.
   */
  static async isSectionExistByStatus(status) {
    try {
      const section = await Section.findOne({
        where: { section_status: status },
      });
      return section !== null;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = SectionRepository;

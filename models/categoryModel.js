class Category {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static fromRow(row) {
    return new Category(
        row.category_id,
        row.category_name
    );
  }
}

module.exports = Category;

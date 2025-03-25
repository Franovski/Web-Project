class User {
    constructor(id,role,createdAt,firstName,lastName,email,password,phoneNbr){
        this.id = id;
        this.role = role;
        this.createdAt = createdAt;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phoneNbr = phoneNbr;
    }

    static fromRow(row) {
        return new User(
            row.user_id,
            row.role,
            row.created_at,
            row.first_name,
            row.last_name,
            row.email,
            row.password,
            row.phone_number
        );
    }
}

module.exports = User;
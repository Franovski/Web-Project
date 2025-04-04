const UserRepository = require('../repositories/userRepository');
const TokenAuth = require('../Utils/tokenAuth');
const Hashing = require('../Utils/hashing');
const User = require('../models/userModel');

class UserService {
    
    /**
     * Creates a new user in the database.
     * @param {User} user - The user object to be created.
     * @returns {Promise<User>} The created user object.
     */
    static async create(user)
    {
        try{
            return UserRepository.create(user);
        }catch(err){
            throw new Error(err);
        }    
    }

    /**
     * Updates an existing user in the database.
     * @param {User} user - The user object to be updated.
     * @returns {Promise<User>} The updated user object.
     */
    static async update(user)
    {
        try{
            if(! await UserRepository.isUserExistById(user.id)){
                throw new Error(`User with id ${user.id} does not exist`);
            }
            return UserRepository.update(user);
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Deletes a user from the database.
     * @param {string} id - The ID of the user to be deleted.
     * @returns {Promise<User>} The result of the deletion operation.
     */
    static async delete(id)
    {
        try{
            if(! await UserRepository.isUserExistById(id)){
                throw new Error(`User with id ${id} does not exist`);
            }
            return UserRepository.delete(id);
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * Retrieves all users from the database.
     * @returns {Promise<Array>} A list of all users.
     */
    static async readAll()
    {
        try {
            // Fetch all users
            const users = await UserRepository.readAll();
    
            // Convert BigInt fields (if any) to strings in the entire array of users
            const usersWithSafeBigInts = JSON.parse(
                JSON.stringify(users, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return usersWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read all users: ${err.message}`);
        }
    }

    /**
     * Retrieves a user by their ID.
     * @param {string} id - The ID of the user to be fetched.
     * @returns {Promise<User>} The user object.
     */
    static async readUserById(id)
    {
        try {
            // Check if the user exists by ID
            const userExists = await UserRepository.isUserExistById(id);
            if (!userExists) {
                throw new Error(`User with id ${id} does not exist`);
            }
    
            // Fetch the user by ID
            const user = await UserRepository.readUserById(id);
    
            // Convert BigInt fields (if any) to strings before returning
            const userWithSafeBigInts = JSON.parse(
                JSON.stringify(user, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return userWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read user by id: ${err.message}`);
        }
    }

    /**
     * Retrieves a user by their first name.
     * @param {string} firstName - The first name of the user to be fetched.
     * @returns {Promise<User>} The user object.
     */
    static async readUserByFirstName(firstName)
    {
        try {
            // Check if the user exists by firstName
            const userExists = await UserRepository.isUserExistByFirstName(firstName);
            if (!userExists) {
                throw new Error(`User with first name ${firstName} does not exist`);
            }
    
            // Fetch the user
            const user = await UserRepository.readUserByFirstName(firstName);
    
            // Convert BigInt fields (if any) to strings before returning
            const userWithSafeBigInts = JSON.parse(
                JSON.stringify(user, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return userWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read user by first name: ${err.message}`);
        }
    }

    /**
     * Retrieves a user by their last name.
     * @param {string} lastName - The last name of the user to be fetched.
     * @returns {Promise<User>} The user object.
     */
    static async readUserByLastName(lastName)
    {
        try {
            // Check if the user exists by lastName
            const userExists = await UserRepository.isUserExistByLastName(lastName);
            if (!userExists) {
                throw new Error(`User with last name ${lastName} does not exist`);
            }
    
            // Fetch the user by lastName
            const user = await UserRepository.readUserByLastName(lastName);
    
            // Convert BigInt fields (if any) to strings before returning
            const userWithSafeBigInts = JSON.parse(
                JSON.stringify(user, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return userWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read user by last name: ${err.message}`);
        }
    }

    /**
     * Retrieves a user by their email address.
     * @param {string} email - The email of the user to be fetched.
     * @returns {Promise<User>} The user object.
     */
    static async readUserByEmail(email){
        try {
            // Check if the user exists by email
            const userExists = await UserRepository.isUserExistByEmail(email);
            if (!userExists) {
                throw new Error(`User with email ${email} does not exist`);
            }
    
            // Fetch the user by email
            const user = await UserRepository.readUserByEmail(email);
    
            // Convert BigInt fields (if any) to strings before returning
            const userWithSafeBigInts = JSON.parse(
                JSON.stringify(user, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return userWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read user by email: ${err.message}`);
        }
    }

    /**
     * Retrieves the password of a user by their email.
     * @param {string} email - The email of the user to fetch the password for.
     * @returns {Promise<User>} The user password object.
     */
    static async getPasswordByEmail(email){
        try {
            // Check if the user exists by email
            const userExists = await UserRepository.isUserExistByEmail(email);
            if (!userExists) {
                throw new Error(`User with email ${email} does not exist`);
            }
    
            // Fetch the password by email
            const password = await UserRepository.getPasswordByEmail(email);
    
            // Convert BigInt fields (if any) to strings before returning
            const passwordWithSafeBigInts = JSON.parse(
                JSON.stringify(password, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return passwordWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read password by email: ${err.message}`);
        }
    }

    /**
     * Retrieves the tickets of a user by their ID.
     * @param {string} id - The user ID to fetch their tickets.
     * @returns {Promise<Array>} A list of the user's tickets.
     */
    static async readUserTickets(id){
        try {
            // Check if the user exists by ID
            const userExists = await UserRepository.isUserExistById(id);
            if (!userExists) {
                throw new Error(`User with id ${id} does not exist`);
            }
    
            // Fetch the user's tickets by ID
            const tickets = await UserRepository.readUserTickets(id);
    
            // Convert BigInt fields (if any) to strings before returning
            const ticketsWithSafeBigInts = JSON.parse(
                JSON.stringify(tickets, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return ticketsWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read user tickets: ${err.message}`);
        }
    }

    /**
     * Retrieves users by their role.
     * @param {string} role - The role to filter users.
     * @returns {Promise<Array>} A list of users with the specified role.
     */
    static async readUserByRole(role){
        try {
            // Check if the user exists by role
            const userExists = await UserRepository.isUserExistByRole(role);
            if (!userExists) {
                throw new Error(`User with role ${role} does not exist`);
            }
    
            // Fetch users by role
            const users = await UserRepository.readUserByRole(role);
    
            // Convert BigInt fields (if any) to strings before returning
            const usersWithSafeBigInts = JSON.parse(
                JSON.stringify(users, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return usersWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read users by role: ${err.message}`);
        }
    }

    /**
     * Retrieves the role of a user by their ID.
     * @param {string} id - The user ID to fetch their role.
     * @returns {Promise<User>} The user's role object.
     */
    static async readUserRoleById(id){
        try {
            // Check if the user exists by ID
            const userExists = await UserRepository.isUserExistById(id);
            if (!userExists) {
                throw new Error(`User with id ${id} does not exist`);
            }
    
            // Fetch the user's role by ID
            const role = await UserRepository.readUserRoleById(id);
    
            // Convert BigInt fields (if any) to strings before returning
            const roleWithSafeBigInts = JSON.parse(
                JSON.stringify(role, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
    
            return roleWithSafeBigInts;
        } catch (err) {
            throw new Error(`Failed to read user role by id: ${err.message}`);
        }
    }

    /**
     * Authenticates a user by email and password.
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     * @returns {Promise<User>} A message and a generated token for the user.
     */
    static async login(email, password) {
        try {
            // Fetch user and extract from array if needed
            const users = await UserRepository.readUserByEmail(email);
            const user = users[0]; // Extract the first user from the array
            
            // Check if the user exists
            if (!user) {
                throw new Error(`User with email ${email} does not exist`);
            }
    
            // Ensure the user has a stored password
            if (!user.password) {
                throw new Error("User does not have a password set up. Please contact support.");
            }
    
            // Log the plain and hashed password for debugging
            const hashedPassword = user.password;
            console.log("Plain password:", password);
            console.log("Hashed password retrieved:", hashedPassword);
    
            // Verify the password
            const validPassword = await Hashing.comparePassword(password, hashedPassword);
            if (!validPassword) {
                throw new Error("Invalid email or password.");
            }
    
            // Generate token with user details (convert BigInt to string)
            const token = TokenAuth.generateToken({
                id: user.id.toString(), // Convert BigInt to string
                email: user.email,
                role: user.role,
            });
    
            // Return the user object (convert BigInt fields to strings)
            return {
                message: "Login successful",
                token: token,
                user: {
                    email: user.email,
                    role: user.role,
                    id: user.id.toString(), // Convert BigInt to string
                },
            };
        } catch (error) {
            // Log error details for troubleshooting
            console.error('Error during login:', error.message);
            throw new Error(error.message);
        }
    }

    /**
     * Changes the user's password by verifying the old password and setting a new one.
     * @param {string} email - The email of the user to change the password for.
     * @param {string} oldPassword - The user's old password.
     * @param {string} newPassword - The new password to set.
     * @returns {Promise<User>} The updated user object with the new password.
     */
    static async changePassword(email, oldPassword, newPassword) {
        try{
            //Check if the user exists
            if(!await UserRepository.isUserExistByEmail(email)){
                throw new Error(`User with email ${email} does not exist`);
            }
            const users = await UserRepository.readUserByEmail(email);
            const user = users[0];
            //console.log(user)

             // Verify the password

            const hashedPassword = user.password;
            const validPassword = await Hashing.comparePassword(oldPassword, hashedPassword);
            if (!validPassword) {
                throw new Error("Old password is incorrect.");
            }
            
            //return the user with the updated password
            const updatedUser = await UserRepository.changePassword(email, newPassword);
            return updatedUser;
        }catch(err){
            throw new Error(err.message);
        }
    }
}

module.exports = UserService;

/*static async requestPasswordReset(email) {
        try {
            const user = await db.query('SELECT * FROM users WHERE email = ?', [email]);
            if (!user) {
                throw new Error('User not found');
            }

            // Generate a 6-digit OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            // Set expiration time (e.g., 10 minutes)
            const otpExpires = Date.now() + 10 * 60 * 1000;

            // Store OTP and expiration in the database
            await db.query('UPDATE users SET reset_otp = ?, reset_otp_expires = ? WHERE email = ?', [otp, otpExpires, email]);

            // Send OTP to user's email
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: { user: 'your-email@gmail.com', pass: 'your-email-password' }
            });

            await transporter.sendMail({
                from: 'support@yourdomain.com',
                to: email,
                subject: 'Your Password Reset OTP',
                html: `<p>Your OTP for password reset is: <strong>${otp}</strong>. This OTP expires in 10 minutes.</p>`
            });

            return { message: 'OTP sent to email' };

        } catch (error) {
            console.error("Error in requestPasswordReset:", error.message);
            throw new Error("Error sending OTP.");
        }
    }*/

    /*static async resetPasswordWithOTP(email, otp, newPassword) {
        try {
            const user = await db.query('SELECT * FROM users WHERE email = ?', [email]);
            if (!user) {
                throw new Error('User not found');
            }

            // Check if OTP is correct and not expired
            if (user.reset_otp !== otp || user.reset_otp_expires < Date.now()) {
                throw new Error('Invalid or expired OTP');
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update password and clear OTP fields
            await db.query('UPDATE users SET password = ?, reset_otp = NULL, reset_otp_expires = NULL WHERE email = ?', [hashedPassword, email]);

            return { message: 'Password reset successful' };

        } catch (error) {
            console.error("Error in resetPasswordWithOTP:", error.message);
            throw new Error("Error resetting password.");
        }
    }*/
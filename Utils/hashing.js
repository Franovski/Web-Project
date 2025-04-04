const bcrypt = require('bcrypt');

class Hashing {
    static async hashPassword(password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            return hashedPassword;
        } catch (error) {
            console.error("Error while hashing the password:", error.message);
            throw new Error("Failed to hash password.");
        }
    } 

    static async comparePassword(plainPassword, password) {
        try {
            // Add debug logs to check the values being passed
            console.log("Comparing passwords. Plain password:", plainPassword);
            console.log("Hashed password:", password);
            
            //Ensure the plainPassword is valid before comparing
            if (!plainPassword) {
                throw new Error("Plain password is invalid or null.");
            }

            // Ensure the hashedPassword is valid before comparing
            if (!password) {
                throw new Error("Hashed password is invalid or null.");
            }
    
            // Compare plain password with the hashed password
            const isMatch = await bcrypt.compare(plainPassword, password);
            return isMatch;

        } catch (error) {
            console.error("Error during password comparison:", error.message);
            throw new Error("Failed to compare passwords. Please try again later.");
        }
    }
}

module.exports = Hashing;
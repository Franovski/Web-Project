const jwt = require('jsonwebtoken');
require('dotenv').config();

class TokenAuth {
    static checkSecret() {
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET is missing from environment variables.');
        }
        return JWT_SECRET;
    }

    static generateToken(payload) {
        const JWT_SECRET = this.checkSecret();
        return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    }

    static verifyToken(token) {
        const JWT_SECRET = this.checkSecret();
        
        if (!token) {
            console.error("No token provided for verification.");
            return null;
        }

        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (err) {
            console.error("Token verification failed: ", err.message);
            return null;
        }
    }
}

module.exports = TokenAuth;
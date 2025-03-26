const User = require('../models/userModel');
const userService = require('../services/userService.js');

class UserController{

    static async create(req,res){
        try{
            const {role, createdAt, firstName, lastName, email, password, phoneNbr} = req.body;
            var user = new User(0, role, createdAt, firstName, lastName, email, password, phoneNbr);
            const result = await userService.create(user);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in UserController.create: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async update(req,res){
        try{
            const {role, createdAt, firstName, lastName, email, password, phoneNbr} = req.body;
            const {id} = req.params;
            var user = new User(id, role, createdAt, firstName, lastName, email, password, phoneNbr);
            const result = await userService.update(user);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in UserController.update: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async delete(req,res){
        try{
            const {id} = req.params;
            const result = await userService.delete(id);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in UserController.delete: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async readAll(req,res){
        try{
            const result = await userService.readAll();
            res.status(200).json(result);
        }catch(err){
            console.error("Error in UserController.readAll: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async readUserById(req,res){
        try{
            const {id} = req.params;
            const result = await userService.readUserById(id);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in UserController.readUserById: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async readUserByFirstName(req,res){
        try{
            const {firstName} = req.params;
            const result = await userService.readUserByFirstName(firstName);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in UserController.readUserByFirstName: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async readUserByLastName(req,res){
        try{
            const {lastName} = req.params;
            const result = await userService.readUserByLastName(lastName);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in UserController.readUserByLastName: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async readUserByEmail(req,res){
        try{
            const {email} = req.params;
            const result = await userService.readUserByEmail(email);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in UserController.readUserByEmail: " , err.message);
            res.status(500).json(err.message);
        }
    }

    static async getPasswordByEmail(req,res){
        try{
            const {email} = req.params;
            const result = await userService.getPasswordByEmail(email);
            res.status(200).json(result);
        }catch(err){
            console.error("Error in UserController.getPasswordByEmail: ", err.message);
            res.status(500).json(err.message);
        }
    }

    static async login(req,res){
        try{
            const {email, password} = req.body;

            if(!email){
                return res.status(400).json({message: "Email is required"});
            }
            if(!password){
                return res.status(400).json({message: "Password is required"});
            }

            const user = await userService.login(email,password);
            return res.status(200).json(user);
        }catch(err){
            console.error("Error in UserController.login: ", err.message);
            return res.status(500).json({message: err.message});
        }
    }

    static async changePassword(req, res){
        try{
            const {email, oldPassword, newPassword} = req.body;
            const user = await userService.readUserByEmail(email);
            const result = await userService.changePassword(email, oldPassword, newPassword);
            return res.status(200).json({message: `password changed successfully`, result: result});
        }catch(err){
            console.error("Error in UserController.changePassword: ", err.message);
            return res.status(500).json({message: err.message});
        }
    }
}

module.exports = UserController;
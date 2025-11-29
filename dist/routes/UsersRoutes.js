"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UsersDA_1 = require("../DA/UsersDA");
const router = express_1.default.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - usertype
 *         - email
 *         - password
 *       properties:
 *         userid:
 *           type: integer
 *           description: Auto-generated unique identifier for the user
 *           example: 1
 *         firstname:
 *           type: string
 *           description: The user's first name
 *           example: John
 *         lastname:
 *           type: string
 *           description: The user's last name
 *           example: Doe
 *         usertype:
 *           type: string
 *           description: The type of user
 *           enum: [Student, Staff, Admin]
 *           example: Student
 *         email:
 *           type: string
 *           description: User's email address
 *           example: johndoe@example.com
 *         password:
 *           type: string
 *           description: User's password (hashed or plain for dev)
 *           example: password123
 *         phonenumber:
 *           type: string
 *           nullable: true
 *           description: Optional phone number
 *           example: "+1-555-123-4567"
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/", async (req, res) => {
    try {
        const user = req.body;
        const newId = await UsersDA_1.UsersDA.create(user);
        res.status(201).json({ message: "User created", userId: newId });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create user" });
    }
});
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
router.get("/", async (_req, res) => {
    try {
        const users = await UsersDA_1.UsersDA.getAll();
        res.json(users);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const user = await UsersDA_1.UsersDA.read(id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch user" });
    }
});
/**
 * @swagger
 * /users:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: UserId is required
 *       500:
 *         description: Internal server error
 */
router.put("/", async (req, res) => {
    try {
        const user = req.body;
        if (!user.userid)
            return res.status(400).json({ message: "UserId is required" });
        await UsersDA_1.UsersDA.update(user);
        res.json({ message: "User updated successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update user" });
    }
});
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        await UsersDA_1.UsersDA.delete(id);
        res.json({ message: "User deleted successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete user" });
    }
});
exports.default = router;

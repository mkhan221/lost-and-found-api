"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserItemsDA_1 = require("../DA/UserItemsDA");
const UserItemsDetailsDA_1 = require("../DA/UserItemsDetailsDA");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: UserItems
 *   description: API for managing user-posted items
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     UserItem:
 *       type: object
 *       properties:
 *         useritemid:
 *           type: integer
 *           description: Auto-generated ID of the user item
 *         postedbyuserid:
 *           type: integer
 *           description: ID of the user who posted the item
 *         locationid:
 *           type: integer
 *           nullable: true
 *           description: ID of the location (optional)
 *         itemid:
 *           type: integer
 *           description: ID of the item
 *         isfound:
 *           type: boolean
 *           description: Whether the item has been found
 *         dateposted:
 *           type: string
 *           format: date-time
 *           description: Date the user item was posted
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     UserItemDetails:
 *       type: object
 *       description: Human-readable detailed user item with joined item, location, QR code, and poster info
 *       properties:
 *         useritemid:
 *           type: integer
 *         useritemdateposted:
 *           type: string
 *           format: date-time
 *         isfound:
 *           type: boolean
 *         itemid:
 *           type: integer
 *         itemdescription:
 *           type: string
 *         itemcategory:
 *           type: string
 *         itemimagepath:
 *           type: string
 *           nullable: true
 *         itemstatus:
 *           type: string
 *         itemdateposted:
 *           type: string
 *           format: date-time
 *         locationid:
 *           type: integer
 *           nullable: true
 *         locationbuilding:
 *           type: string
 *           nullable: true
 *         locationdescription:
 *           type: string
 *           nullable: true
 *         qrcodeid:
 *           type: integer
 *           nullable: true
 *         qrcodepath:
 *           type: string
 *           nullable: true
 *         qrcodecreatedon:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         postedbyuserid:
 *           type: integer
 *         postedbyfirstname:
 *           type: string
 *         postedbylastname:
 *           type: string
 *         postedbyusertype:
 *           type: string
 *         postedbyemail:
 *           type: string
 *         postedbyphonenumber:
 *           type: string
 *           nullable: true
 */
/**
 * @swagger
 * /useritems:
 *   get:
 *     summary: Get all user items (detailed view)
 *     tags: [UserItems]
 *     responses:
 *       200:
 *         description: List of all user items with human-readable details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserItemDetails'
 */
router.get("/", async (_req, res, next) => {
    try {
        const userItemDetailsInstances = await UserItemsDetailsDA_1.UserItemsDetailsDA.getAll();
        res.json(userItemDetailsInstances);
    }
    catch (err) {
        next(err);
    }
});
/**
 * @swagger
 * /useritems/{id}:
 *   get:
 *     summary: Get a user item by ID (detailed view)
 *     tags: [UserItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user item
 *     responses:
 *       200:
 *         description: User item details found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserItemDetails'
 *       404:
 *         description: User item not found
 */
router.get("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const userItemDetailsInstances = await UserItemsDetailsDA_1.UserItemsDetailsDA.read(id);
        if (!userItemDetailsInstances)
            return res.status(404).json({ message: "User item not found" });
        res.json(userItemDetailsInstances);
    }
    catch (err) {
        next(err);
    }
});
/**
 * @swagger
 * /useritems:
 *   post:
 *     summary: Create a new user item
 *     tags: [UserItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserItem'
 *     responses:
 *       201:
 *         description: User item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 useritemid:
 *                   type: integer
 */
router.post("/", async (req, res, next) => {
    try {
        const userItem = req.body;
        const id = await UserItemsDA_1.UserItemsDA.create(userItem);
        res.status(201).json({ useritemid: id });
    }
    catch (err) {
        next(err);
    }
});
/**
 * @swagger
 * /useritems/{id}:
 *   put:
 *     summary: Update a user item
 *     tags: [UserItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserItem'
 *     responses:
 *       204:
 *         description: User item updated successfully
 *       400:
 *         description: useritemid is required
 */
router.put("/:id", async (req, res, next) => {
    try {
        const useritemid = parseInt(req.params.id);
        const userItem = {
            ...req.body,
            useritemid,
            claimedbyuserid: req.body.claimedbyuserid ?? null
        };
        await UserItemsDA_1.UserItemsDA.update(userItem);
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
});
/**
 * @swagger
 * /useritems/{id}:
 *   delete:
 *     summary: Delete a user item
 *     tags: [UserItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user item to delete
 *     responses:
 *       204:
 *         description: User item deleted successfully
 */
router.delete("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        await UserItemsDA_1.UserItemsDA.delete(id);
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;

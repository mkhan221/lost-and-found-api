"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LocationsDA_1 = require("../DA/LocationsDA");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Endpoints for managing locations
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       properties:
 *         locationid:
 *           type: integer
 *           description: Unique identifier for the location
 *         qrcodeid:
 *           type: integer
 *           nullable: true
 *           description: QR code associated with this location
 *         buildingname:
 *           type: string
 *           description: Name of the building
 *         description:
 *           type: string
 *           nullable: true
 *           description: Optional description of the location
 */
/**
 * @swagger
 * /locations:
 *   get:
 *     summary: Get all locations
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: List of locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 *       500:
 *         description: Server error while fetching locations
 */
router.get("/", async (_req, res) => {
    try {
        const locations = await LocationsDA_1.LocationsDA.getAll();
        res.json(locations);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch locations" });
    }
});
/**
 * @swagger
 * /locations/{id}:
 *   get:
 *     summary: Get a location by ID
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Location ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Location found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Location not found
 *       500:
 *         description: Server error while fetching location
 */
router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const location = await LocationsDA_1.LocationsDA.read(id);
        if (!location)
            return res.status(404).json({ message: "Location not found" });
        res.json(location);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch location" });
    }
});
/**
 * @swagger
 * /locations:
 *   post:
 *     summary: Create a new location
 *     tags: [Locations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       201:
 *         description: Location created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Location created
 *                 locationId:
 *                   type: integer
 *       500:
 *         description: Failed to create location
 */
router.post("/", async (req, res) => {
    try {
        const location = req.body;
        const newId = await LocationsDA_1.LocationsDA.create(location);
        res.status(201).json({ message: "Location created", locationId: newId });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create location" });
    }
});
/**
 * @swagger
 * /locations:
 *   put:
 *     summary: Update an existing location
 *     tags: [Locations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       200:
 *         description: Location updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Location updated successfully
 *       400:
 *         description: Missing required LocationId
 *       500:
 *         description: Failed to update location
 */
router.put("/", async (req, res) => {
    try {
        const location = req.body;
        if (!location.locationid)
            return res.status(400).json({ message: "locationid is required" });
        await LocationsDA_1.LocationsDA.update(location);
        res.json({ message: "Location updated successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update location" });
    }
});
/**
 * @swagger
 * /locations/{id}:
 *   delete:
 *     summary: Delete a location by ID
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Location ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Location deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Location deleted successfully
 *       500:
 *         description: Failed to delete location
 */
router.delete("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        await LocationsDA_1.LocationsDA.delete(id);
        res.json({ message: "Location deleted successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete location" });
    }
});
exports.default = router;

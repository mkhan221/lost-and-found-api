"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const QrCodesDA_1 = require("../DA/QrCodesDA");
const router = express_1.default.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     QrCode:
 *       type: object
 *       properties:
 *         qrcodeid:
 *           type: integer
 *         locationid:
 *           type: integer
 *         qrcodepath:
 *           type: string
 *         createdon:
 *           type: string
 *           format: date-time
 */
/**
 * @swagger
 * /qrcodes:
 *   post:
 *     summary: Create a new QR code
 *     tags: [QrCodes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QrCode'
 *     responses:
 *       201:
 *         description: QR code created
 */
router.post("/", async (req, res) => {
    try {
        const qrCode = req.body;
        const newId = await QrCodesDA_1.QrCodesDA.create(qrCode);
        res.status(201).json({ message: "QrCode created", qrcodeid: newId });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create QR code" });
    }
});
/**
 * @swagger
 * /qrcodes/{id}:
 *   get:
 *     summary: Get a QR code by ID
 *     tags: [QrCodes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: QR code found
 */
router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const qrCode = await QrCodesDA_1.QrCodesDA.read(id);
        if (!qrCode)
            return res.status(404).json({ message: "QR code not found" });
        res.json(qrCode);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch QR code" });
    }
});
/**
 * @swagger
 * /qrcodes:
 *   put:
 *     summary: Update a QR code
 *     tags: [QrCodes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QrCode'
 */
router.put("/", async (req, res) => {
    try {
        const qrCode = req.body;
        if (!qrCode.qrcodeid)
            return res.status(400).json({ message: "QrCodeId is required" });
        await QrCodesDA_1.QrCodesDA.update(qrCode);
        res.json({ message: "QR code updated successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update QR code" });
    }
});
/**
 * @swagger
 * /qrcodes/{id}:
 *   delete:
 *     summary: Delete a QR code by ID
 *     tags: [QrCodes]
 */
router.delete("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        await QrCodesDA_1.QrCodesDA.delete(id);
        res.json({ message: "QR code deleted successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete QR code" });
    }
});
/**
 * @swagger
 * /qrcodes:
 *   get:
 *     summary: Get all QR codes
 *     tags: [QrCodes]
 */
router.get("/", async (_req, res) => {
    try {
        const qrCodes = await QrCodesDA_1.QrCodesDA.getAll();
        res.json(qrCodes);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch QR codes" });
    }
});
exports.default = router;

import express, { Request, Response } from "express";
import { ItemsDA } from "../DA/ItemsDA";
import { Item } from "../models/Item";
import path from "path";
import multer from "multer";
import fs from "fs";

const router = express.Router();

/* Ensure uploads directory exists on server (works on Linux + Win) */
const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

/* Configure Multer storage (keeps original filename with timestamp) */
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) =>
    {
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        cb(null, `${timestamp}${ext}`);
    }
});

const upload = multer({ storage });


/**
 * @swagger
 * tags:
 *   name: Items
 *   description: API for managing items
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       properties:
 *         itemid:
 *           type: integer
 *           description: Auto-generated ID of the item
 *         description:
 *           type: string
 *           description: Description of the item
 *         category:
 *           type: string
 *           description: Category of the item
 *         imagepath:
 *           type: string
 *           description: URL or path to the image
 *         dateposted:
 *           type: string
 *           format: date-time
 *           description: Date the item was posted
 *         status:
 *           type: string
 *           enum: [Lost, Found, Returned]
 *           description: Status of the item
 */

// /**
//  * @swagger
//  * /items:
//  *   post:
//  *     summary: Create a new item
//  *     tags: [Items]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Item'
//  *     responses:
//  *       201:
//  *         description: Item created successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                 itemId:
//  *                   type: integer
//  */
// router.post("/", async (req: Request, res: Response) =>
// {
//     try
//     {
//         const item: Item = req.body;
//         const newId = await ItemsDA.create(item);
//         res.status(201).json({ message: "Item created", itemId: newId });
//     } catch (err)
//     {
//         console.error(err);
//         res.status(500).json({ error: "Failed to create item" });
//     }
// });

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create an item with optional image upload
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Lost, Found, Returned]
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Item created successfully
 */
router.post("/", upload.single("image"), async (req: Request, res: Response) =>
{
    try
    {
        const { description, category, status } = req.body;

        const item: Item = {
            description,
            category,
            status,
            imagepath: req.file ? `/uploads/${req.file.filename}` : undefined,
            dateposted: new Date()
        };

        const newId = await ItemsDA.create(item);
        res.status(201).json({ message: "Item created", itemId: newId });

    } catch (err)
    {
        console.error(err);
        res.status(500).json({ error: "Failed to create item" });
    }
});


/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get an item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the item to fetch
 *     responses:
 *       200:
 *         description: Item found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 */
router.get("/:id", async (req: Request, res: Response) =>
{
    try
    {
        const id = Number(req.params.id);
        const item = await ItemsDA.read(id);
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.json(item);
    } catch (err)
    {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch item" });
    }
});

/**
 * @swagger
 * /items:
 *   put:
 *     summary: Update an existing item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       400:
 *         description: ItemId is required
 *       500:
 *         description: Internal server error
 */
router.put("/", async (req: Request, res: Response) =>
{
    try
    {
        const item: Item = req.body;
        if (!item.itemid)
            return res.status(400).json({ message: "ItemId is required" });

        await ItemsDA.update(item);
        res.json({ message: "Item updated successfully" });
    } catch (err)
    {
        console.error(err);
        res.status(500).json({ error: "Failed to update item" });
    }
});

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: List of all items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
router.get("/", async (_req: Request, res: Response) =>
{
    try
    {
        const items = await ItemsDA.getAll();
        res.json(items);
    } catch (err)
    {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch items" });
    }
});

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Delete an item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the item to delete
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", async (req: Request, res: Response) =>
{
    try
    {
        const id = Number(req.params.id);
        await ItemsDA.delete(id);
        res.json({ message: "Item deleted successfully" });
    } catch (err)
    {
        console.error(err);
        res.status(500).json({ error: "Failed to delete item" });
    }
});

export default router;

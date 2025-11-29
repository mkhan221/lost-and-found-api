import { pool } from "../db/db";
import { Item } from "../models/Item";

export class ItemsDA
{
    // CREATE
    static async create(item: Item): Promise<number>
    {
        const query = `SELECT fnCreateItems($1, $2, $3, $4) AS id;`;
        const values = [item.description, item.category, item.imagepath || null, item.status];
        const result = await pool.query(query, values);
        return result.rows[0].id;
    }

    // GET ALL
    static async getAll(): Promise<Item[]>
    {
        const query = `SELECT * FROM fnGetAllItems();`;
        const result = await pool.query(query);
        return result.rows;
    }


    // READ
    static async read(itemId: number): Promise<Item | null>
    {
        const query = `SELECT * FROM fnReadItems($1);`;
        const result = await pool.query(query, [itemId]);
        if (result.rows.length === 0) return null;
        return result.rows[0];
    }

    // UPDATE
    static async update(item: Item): Promise<void>
    {
        const query = `SELECT fnUpdateItems($1, $2, $3, $4, $5);`;
        const values = [item.itemid, item.description, item.category, item.imagepath || null, item.status];
        await pool.query(query, values);
    }

    // DELETE
    static async delete(itemId: number): Promise<void>
    {
        const query = `SELECT fnDeleteItems($1);`;
        await pool.query(query, [itemId]);
    }
}

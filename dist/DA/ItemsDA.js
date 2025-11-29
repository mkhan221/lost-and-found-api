"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsDA = void 0;
const db_1 = require("../db/db");
class ItemsDA {
    // CREATE
    static async create(item) {
        const query = `SELECT fnCreateItems($1, $2, $3, $4) AS id;`;
        const values = [item.description, item.category, item.imagepath || null, item.status];
        const result = await db_1.pool.query(query, values);
        return result.rows[0].id;
    }
    // GET ALL
    static async getAll() {
        const query = `SELECT * FROM fnGetAllItems();`;
        const result = await db_1.pool.query(query);
        return result.rows;
    }
    // READ
    static async read(itemId) {
        const query = `SELECT * FROM fnReadItems($1);`;
        const result = await db_1.pool.query(query, [itemId]);
        if (result.rows.length === 0)
            return null;
        return result.rows[0];
    }
    // UPDATE
    static async update(item) {
        const query = `SELECT fnUpdateItems($1, $2, $3, $4, $5);`;
        const values = [item.itemid, item.description, item.category, item.imagepath || null, item.status];
        await db_1.pool.query(query, values);
    }
    // DELETE
    static async delete(itemId) {
        const query = `SELECT fnDeleteItems($1);`;
        await db_1.pool.query(query, [itemId]);
    }
}
exports.ItemsDA = ItemsDA;

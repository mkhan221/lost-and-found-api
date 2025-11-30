"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserItemsDA = void 0;
const db_1 = require("../db/db");
class UserItemsDA {
    static async create(userItem) {
        const query = `
            SELECT fnCreateUserItems($1, $2, $3, $4) AS id
        `;
        const values = [
            userItem.postedbyuserid,
            userItem.locationid ?? null,
            userItem.itemid,
            userItem.isfound ?? false,
        ];
        const result = await db_1.pool.query(query, values);
        return result.rows[0].id;
    }
    static async getAll() {
        const query = `SELECT * FROM fnGetAllUserItems()`;
        const result = await db_1.pool.query(query);
        return result.rows;
    }
    static async read(useritemid) {
        const query = `SELECT * FROM fnReadUserItems($1)`;
        const result = await db_1.pool.query(query, [useritemid]);
        return result.rows[0] || null;
    }
    static async update(userItem) {
        if (!userItem.useritemid)
            throw new Error("useritemid is required to update a user item.");
        const query = `
        SELECT fnUpdateUserItems($1, $2, $3, $4, $5)
    `;
        const values = [
            userItem.useritemid,
            userItem.locationid ?? null,
            userItem.itemid,
            userItem.isfound ?? false,
            userItem.claimedbyuserid ?? null
        ];
        await db_1.pool.query(query, values);
    }
    static async delete(useritemid) {
        const query = `SELECT * FROM fnDeleteUserItems($1)`;
        await db_1.pool.query(query, [useritemid]);
    }
}
exports.UserItemsDA = UserItemsDA;

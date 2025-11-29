"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserItemsDetailsDA = void 0;
const db_1 = require("../db/db");
class UserItemsDetailsDA {
    static async getAll() {
        const query = `SELECT * FROM fnGetAllUserItemsDetails();`;
        const result = await db_1.pool.query(query);
        return result.rows;
    }
    static async read(userItemId) {
        const query = `SELECT * FROM fnReadUserItemDetails($1);`;
        const result = await db_1.pool.query(query, [userItemId]);
        if (result.rows.length === 0)
            return null;
        return result.rows[0];
    }
}
exports.UserItemsDetailsDA = UserItemsDetailsDA;

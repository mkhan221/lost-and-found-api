"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersDA = void 0;
const db_1 = require("../db/db");
class UsersDA {
    static async create(user) {
        const query = `
            SELECT fnCreateUsers($1, $2, $3, $4, $5, $6) AS id
        `;
        const values = [
            user.firstname,
            user.lastname,
            user.usertype,
            user.email,
            user.password,
            user.phonenumber ?? null,
        ];
        const result = await db_1.pool.query(query, values);
        return result.rows[0].id;
    }
    static async getAll() {
        const query = `SELECT * FROM fnGetAllUsers()`;
        const result = await db_1.pool.query(query);
        return result.rows;
    }
    static async read(userid) {
        const query = `SELECT * FROM fnReadUsers($1)`;
        const result = await db_1.pool.query(query, [userid]);
        return result.rows[0] || null;
    }
    static async update(user) {
        if (!user.userid) {
            throw new Error("userid is required to update a user.");
        }
        const query = `
            SELECT * FROM fnUpdateUsers($1, $2, $3, $4, $5, $6, $7)
        `;
        const values = [
            user.userid,
            user.firstname,
            user.lastname,
            user.usertype,
            user.email,
            user.password,
            user.phonenumber ?? null,
        ];
        await db_1.pool.query(query, values);
    }
    static async delete(userid) {
        const query = `SELECT * FROM fnDeleteUsers($1)`;
        await db_1.pool.query(query, [userid]);
    }
}
exports.UsersDA = UsersDA;

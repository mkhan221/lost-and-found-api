"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QrCodesDA = void 0;
const db_1 = require("../db/db");
class QrCodesDA {
    // CREATE
    static async create(qrCode) {
        const query = `SELECT fnCreateQrCodes($1, $2) AS id;`;
        const values = [qrCode.locationid || null, qrCode.qrcodepath];
        const result = await db_1.pool.query(query, values);
        return result.rows[0].id;
    }
    // READ
    static async read(qrCodeId) {
        const query = `SELECT * FROM fnReadQrCodes($1);`;
        const result = await db_1.pool.query(query, [qrCodeId]);
        if (result.rows.length === 0)
            return null;
        return result.rows[0];
    }
    // UPDATE
    static async update(qrCode) {
        const query = `SELECT fnUpdateQrCodes($1, $2, $3);`;
        const values = [qrCode.qrcodeid, qrCode.locationid || null, qrCode.qrcodepath];
        await db_1.pool.query(query, values);
    }
    // DELETE
    static async delete(qrCodeId) {
        const query = `SELECT fnDeleteQrCodes($1);`;
        await db_1.pool.query(query, [qrCodeId]);
    }
    // GET ALL
    static async getAll() {
        const query = `SELECT * FROM "QrCodes";`;
        const result = await db_1.pool.query(query);
        return result.rows;
    }
}
exports.QrCodesDA = QrCodesDA;

import { pool } from "../db/db";
import { QrCode } from "../models/QrCode";

export class QrCodesDA
{

    // CREATE
    static async create(qrCode: QrCode): Promise<number>
    {
        const query = `SELECT fnCreateQrCodes($1, $2) AS id;`;
        const values = [qrCode.locationid || null, qrCode.qrcodepath];
        const result = await pool.query(query, values);
        return result.rows[0].id;
    }

    // READ
    static async read(qrCodeId: number): Promise<QrCode | null>
    {
        const query = `SELECT * FROM fnReadQrCodes($1);`;
        const result = await pool.query(query, [qrCodeId]);
        if (result.rows.length === 0) return null;
        return result.rows[0];
    }

    // UPDATE
    static async update(qrCode: QrCode): Promise<void>
    {
        const query = `SELECT fnUpdateQrCodes($1, $2, $3);`;
        const values = [qrCode.qrcodeid, qrCode.locationid || null, qrCode.qrcodepath];
        await pool.query(query, values);
    }

    // DELETE
    static async delete(qrCodeId: number): Promise<void>
    {
        const query = `SELECT fnDeleteQrCodes($1);`;
        await pool.query(query, [qrCodeId]);
    }

    // GET ALL
    static async getAll(): Promise<QrCode[]>
    {
        const query = `SELECT * FROM "QrCodes";`;
        const result = await pool.query(query);
        return result.rows;
    }
}

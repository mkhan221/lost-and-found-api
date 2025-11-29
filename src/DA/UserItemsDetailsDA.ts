import { pool } from "../db/db";
import { UserItemDetails } from "../models/UserItemDetails";

export class UserItemsDetailsDA
{
    static async getAll(): Promise<UserItemDetails[]>
    {
        const query = `SELECT * FROM fnGetAllUserItemsDetails();`;
        const result = await pool.query(query);
        return result.rows;
    }

    static async read(userItemId: number): Promise<UserItemDetails | null>
    {
        const query = `SELECT * FROM fnReadUserItemDetails($1);`;
        const result = await pool.query(query, [userItemId]);
        if (result.rows.length === 0) return null;
        return result.rows[0];
    }
}

import { pool } from "../db/db";
import { UserItem } from "../models/UserItem";

export class UserItemsDA
{
    static async create(userItem: UserItem): Promise<number>
    {
        const query = `
            SELECT fnCreateUserItems($1, $2, $3, $4) AS id
        `;
        const values = [
            userItem.postedbyuserid,
            userItem.locationid ?? null,
            userItem.itemid,
            userItem.isfound ?? false,
        ];

        const result = await pool.query(query, values);
        return result.rows[0].id;
    }

    static async getAll(): Promise<UserItem[]>
    {
        const query = `SELECT * FROM fnGetAllUserItems()`;
        const result = await pool.query(query);
        return result.rows;
    }

    static async read(useritemid: number): Promise<UserItem | null>
    {
        const query = `SELECT * FROM fnReadUserItems($1)`;
        const result = await pool.query(query, [useritemid]);
        return result.rows[0] || null;
    }

    static async update(userItem: UserItem): Promise<void>
    {
        if (!userItem.useritemid)
        {
            throw new Error("useritemid is required to update a user item.");
        }

        const query = `
            SELECT * FROM fnUpdateUserItems($1, $2, $3, $4)
        `;
        const values = [
            userItem.useritemid,
            userItem.locationid ?? null,
            userItem.itemid,
            userItem.isfound ?? false,
        ];

        await pool.query(query, values);
    }

    static async delete(useritemid: number): Promise<void>
    {
        const query = `SELECT * FROM fnDeleteUserItems($1)`;
        await pool.query(query, [useritemid]);
    }
}
